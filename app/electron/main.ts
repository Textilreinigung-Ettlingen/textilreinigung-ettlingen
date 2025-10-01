import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import path from 'path'
import { URL } from 'url'

const isDev = process.env.NODE_ENV === 'development'

let mainWindow: BrowserWindow | null = null

const createWindow = async (): Promise<void> => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#121212',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  const pageUrl = isDev
    ? new URL(path.join(__dirname, '../index.html'), 'file:').toString()
    : new URL(path.join(__dirname, '../index.html'), 'file:').toString()
  await mainWindow.loadURL(pageUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('printer:list', async () => {
  if (mainWindow == null) return []
  return mainWindow.webContents.getPrintersAsync()
})

ipcMain.handle('printer:print', async (_event, options: Electron.WebContentsPrintOptions) => {
  if (mainWindow == null) {
    throw new Error('Printer is not available without an open window')
  }

  return await new Promise<boolean>((resolve, reject) => {
    mainWindow?.webContents.print(options, (success, reason) => {
      if (!success) {
        reject(new Error(reason))
      } else {
        resolve(true)
      }
    })
  })
})

ipcMain.handle('dialog:showError', async (_event, message: string) => {
  if (mainWindow == null) return
  await dialog.showErrorBox('Textilreinigung Ettlingen', message)
})

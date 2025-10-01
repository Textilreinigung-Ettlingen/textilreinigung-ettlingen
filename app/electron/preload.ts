import { contextBridge, ipcRenderer } from 'electron'

type PrinterOptions = Electron.WebContentsPrintOptions

declare global {
  interface Window {
    electron: {
      listPrinters: () => Promise<Electron.PrinterInfo[]>
      print: (options: PrinterOptions) => Promise<boolean>
      showError: (message: string) => Promise<void>
    }
  }
}

contextBridge.exposeInMainWorld('electron', {
  listPrinters: async () => await ipcRenderer.invoke('printer:list'),
  print: async (options: PrinterOptions) => await ipcRenderer.invoke('printer:print', options),
  showError: async (message: string) => await ipcRenderer.invoke('dialog:showError', message)
})

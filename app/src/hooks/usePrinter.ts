import { useCallback, useEffect, useState } from 'react'

type PrinterInfo = { name: string }

declare global {
  interface Window {
    electron?: {
      listPrinters: () => Promise<PrinterInfo[]>
      print: (options: Electron.WebContentsPrintOptions) => Promise<boolean>
      showError: (message: string) => Promise<void>
    }
  }
}

export const usePrinter = () => {
  const [printers, setPrinters] = useState<PrinterInfo[]>([])
  const [selectedPrinter, setSelectedPrinter] = useState<string>('')

  useEffect(() => {
    const loadPrinters = async () => {
      if (window.electron == null) return
      const list = await window.electron.listPrinters()
      setPrinters(list)
      if (list.length > 0) {
        setSelectedPrinter(list[0].name)
      }
    }

    void loadPrinters()
  }, [])

  const print = useCallback(
    async (content: string, options?: Partial<Electron.WebContentsPrintOptions>) => {
      if (window.electron == null) {
        console.warn('Electron printing bridge not available')
        return false
      }

      try {
        return await window.electron.print({
          silent: true,
          deviceName: selectedPrinter,
          printBackground: true,
          ...options,
          pageSize: options?.pageSize ?? 'A4'
        })
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unbekannter Fehler'
        await window.electron.showError?.(message)
        return false
      }
    },
    [selectedPrinter]
  )

  return {
    printers,
    selectedPrinter,
    setSelectedPrinter,
    print
  }
}

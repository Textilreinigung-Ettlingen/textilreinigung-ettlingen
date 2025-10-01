import { useEffect, useMemo } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

interface QrScannerProps {
  onResult: (value: string) => void
}

const QrScanner = ({ onResult }: QrScannerProps): JSX.Element => {
  const elementId = useMemo(() => `qr-${Math.random().toString(36).slice(2)}`, [])

  useEffect(() => {
    let scanner: Html5Qrcode | undefined
    const startScanner = async () => {
      if (!('mediaDevices' in navigator)) return
      scanner = new Html5Qrcode(elementId)
      try {
        await scanner.start({ facingMode: 'environment' }, { fps: 10, qrbox: 220 }, (decodedText) => {
          onResult(decodedText)
        })
      } catch (error) {
        console.warn('QR-Scanner konnte nicht gestartet werden', error)
      }
    }

    void startScanner()

    return () => {
      if (scanner != null) {
        void scanner.stop().finally(() => {
          scanner?.clear()
        })
      }
    }
  }, [elementId, onResult])

  return <div id={elementId} style={{ width: '100%' }} />
}

export default QrScanner

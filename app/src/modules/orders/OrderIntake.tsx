import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { QRCodeCanvas } from 'qrcode.react'
import { format } from 'date-fns'
import { useDataStore } from '../../stores/useDataStore.js'
import type { OrderLine, PriceItem } from '../../types'
import { formatCurrency } from '../../utils/currency.js'
import { usePrinter } from '../../hooks/usePrinter.js'
import QrScanner from '../../components/QrScanner.js'

interface FormValues {
  customerName: string
  customerPhone?: string
  customerEmail?: string
  pickupDate: string
  notes?: string
}

const OrderIntake = (): JSX.Element => {
  const priceList = useDataStore((state) => state.priceList)
  const createOrder = useDataStore((state) => state.createOrder)
  const [selectedItem, setSelectedItem] = useState<PriceItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [lines, setLines] = useState<OrderLine[]>([])
  const [qrScanResult, setQrScanResult] = useState('')
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      customerName: '',
      pickupDate: new Date().toISOString().split('T')[0]
    }
  })
  const { print } = usePrinter()

  const total = useMemo(
    () => lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
    [lines]
  )

  const addLine = () => {
    if (selectedItem == null) return
    const existing = lines.find((line) => line.itemId === selectedItem.id)
    if (existing != null) {
      setLines((prev) =>
        prev.map((line) =>
          line.itemId === selectedItem.id
            ? { ...line, quantity: line.quantity + quantity }
            : line
        )
      )
    } else {
      setLines((prev) => [...prev, { itemId: selectedItem.id, price: selectedItem.price, quantity }])
    }
    setQuantity(1)
  }

  const onSubmit = handleSubmit(({ customerName, customerPhone, customerEmail, pickupDate, notes }) => {
    if (lines.length === 0) return

    const order = createOrder({
      customer: { id: crypto.randomUUID(), name: customerName, phone: customerPhone, email: customerEmail },
      lines,
      pickupDate: new Date(pickupDate).toISOString(),
      notes
    })

    const receipt = `Auftrag ${order.orderNumber}\nKunde: ${order.customer.name}\nSumme: ${formatCurrency(order.total)}\nAbholung: ${format(
      new Date(order.pickupDate),
      'dd.MM.yyyy'
    )}`
    void print(receipt, { pageSize: 'A5' })

    reset()
    setLines([])
  })

  return (
    <div className="module-grid">
      <section className="card">
        <header>
          <h3>Auftragsannahme</h3>
          <p>Preisliste durchsuchen, Stückzahl erfassen und Abholtermin festlegen.</p>
        </header>
        <div className="card-body">
          <div className="form-grid">
            <label className="field">
              <span>Artikel</span>
              <select value={selectedItem?.id ?? ''} onChange={(event) => {
                const item = priceList.find((price) => price.id === event.target.value)
                setSelectedItem(item ?? null)
              }}>
                <option value="">Auswählen…</option>
                {priceList.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} · {formatCurrency(item.price)}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Stückzahl</span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value) || 1)}
              />
            </label>
            <button type="button" className="btn primary" onClick={addLine} disabled={selectedItem == null}>
              Position hinzufügen
            </button>
          </div>

          <div className="lines-list">
            {lines.map((line) => {
              const item = priceList.find((price) => price.id === line.itemId)
              if (item == null) return null
              return (
                <article key={line.itemId} className="line-entry">
                  <div>
                    <strong>{item.name}</strong>
                    <span className="muted">{item.category}</span>
                  </div>
                  <div className="line-meta">
                    <span className="muted">
                      {line.quantity} × {formatCurrency(line.price)}
                    </span>
                    <strong>{formatCurrency(line.quantity * line.price)}</strong>
                  </div>
                </article>
              )
            })}
            {lines.length === 0 && <p className="muted">Noch keine Position erfasst.</p>}
          </div>

          <form className="form-grid" onSubmit={onSubmit}>
            <Controller
              control={control}
              name="customerName"
              rules={{ required: true }}
              render={({ field }) => (
                <label className="field">
                  <span>Kund*in</span>
                  <input {...field} placeholder="Name" required />
                </label>
              )}
            />
            <Controller
              control={control}
              name="customerPhone"
              render={({ field }) => (
                <label className="field">
                  <span>Telefon</span>
                  <input {...field} placeholder="Optional" />
                </label>
              )}
            />
            <Controller
              control={control}
              name="customerEmail"
              render={({ field }) => (
                <label className="field">
                  <span>E-Mail</span>
                  <input type="email" {...field} placeholder="Optional" />
                </label>
              )}
            />
            <Controller
              control={control}
              name="pickupDate"
              render={({ field }) => (
                <label className="field">
                  <span>Abholdatum</span>
                  <input type="date" min={new Date().toISOString().split('T')[0]} {...field} />
                </label>
              )}
            />
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <label className="field span-2">
                  <span>Notizen</span>
                  <textarea {...field} rows={3} placeholder="Besondere Hinweise" />
                </label>
              )}
            />
            <div className="form-actions span-2">
              <div className="total-display">Summe: {formatCurrency(total)}</div>
              <div className="action-group">
                <button
                  type="button"
                  className="btn"
                  onClick={() => void print('Label', { pageSize: { width: 57, height: 100 } })}
                >
                  Label 57 mm
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => void print('Label', { pageSize: { width: 80, height: 100 } })}
                >
                  Label 80 mm
                </button>
                <button type="submit" className="btn primary" disabled={lines.length === 0}>
                  Auftrag speichern & drucken
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="card">
        <header>
          <h3>QR & Zusammenfassung</h3>
          <p>Übergabe erleichtern und Scans testen.</p>
        </header>
        <div className="card-body column">
          <div className="qr-block">
            <QRCodeCanvas value={qrScanResult || 'Textilreinigung Ettlingen'} size={220} bgColor="#0f172a" fgColor="#4db6ac" />
            <p className="muted">Scannen Sie den Code am Tresen oder per Kunden-App.</p>
          </div>
          <div className="scanner-block">
            <h4>Scanner</h4>
            {typeof navigator !== 'undefined' && 'mediaDevices' in navigator ? (
              <QrScanner onResult={(value) => setQrScanResult(value)} />
            ) : (
              <p className="muted">Scanner im aktuellen Kontext nicht verfügbar.</p>
            )}
            <p className="muted">Ergebnis: {qrScanResult || 'Noch kein Scan'}</p>
          </div>
          <div className="summary-block">
            <h4>Heute</h4>
            <p>
              Positionen: <strong>{lines.length}</strong>
            </p>
            <p className="muted">Abholung: {format(new Date(), 'dd.MM.yyyy')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderIntake

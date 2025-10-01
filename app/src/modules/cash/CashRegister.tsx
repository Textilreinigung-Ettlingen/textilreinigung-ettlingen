import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { useDataStore } from '../../stores/useDataStore.js'
import type { PaymentMethod } from '../../types'
import { formatCurrency } from '../../utils/currency.js'

interface PaymentForm {
  orderId: string
  amount: number
  method: PaymentMethod
}

interface CashForm {
  type: 'Einzahlung' | 'Auszahlung'
  amount: number
  method: PaymentMethod | 'Sonstiges'
  note?: string
}

const paymentMethods: PaymentMethod[] = ['Bar', 'EC', 'Bank', 'Wise', 'Kreditkarte']

const CashRegister = (): JSX.Element => {
  const orders = useDataStore((state) => state.orders)
  const payments = useDataStore((state) => state.payments)
  const cashEntries = useDataStore((state) => state.cashEntries)
  const recordPayment = useDataStore((state) => state.recordPayment)
  const addCashEntry = useDataStore((state) => state.addCashEntry)
  const selectedRegister = useDataStore((state) => state.selectedRegister)
  const selectRegister = useDataStore((state) => state.selectRegister)

  const { control, handleSubmit, reset } = useForm<PaymentForm>({
    defaultValues: {
      method: 'Bar',
      amount: 0
    }
  })
  const {
    control: cashControl,
    handleSubmit: handleCashSubmit,
    reset: resetCash
  } = useForm<CashForm>({
    defaultValues: {
      type: 'Einzahlung',
      amount: 0,
      method: 'Bar',
      note: ''
    }
  })

  const totals = useMemo(() => {
    const byMethod = paymentMethods.reduce<Record<PaymentMethod, number>>((acc, method) => {
      acc[method] = payments
        .filter((payment) => payment.method === method)
        .reduce((sum, payment) => sum + payment.amount, 0)
      return acc
    }, {
      Bar: 0,
      EC: 0,
      Bank: 0,
      Wise: 0,
      Kreditkarte: 0
    })

    const registerTotals = cashEntries.reduce(
      (acc, entry) => {
        acc[entry.register] += entry.type === 'Einzahlung' ? entry.amount : -entry.amount
        return acc
      },
      { Hauptkasse: 0, Nebenkasse: 0 }
    )

    return { byMethod, registerTotals }
  }, [payments, cashEntries])

  const onPaymentSubmit = handleSubmit(({ orderId, amount, method }) => {
    if (orderId.length === 0 || amount <= 0) return
    recordPayment(orderId, amount, method, selectedRegister)
    reset({ method: 'Bar', orderId: '', amount: 0 })
  })

  const onCashSubmit = handleCashSubmit(({ amount, method, note, type }) => {
    if (amount <= 0) return
    addCashEntry({ amount, method, note, type, register: selectedRegister })
    resetCash({ amount: 0, method: 'Bar', note: '', type: 'Einzahlung' })
  })

  return (
    <div className="module-grid">
      <section className="card">
        <header>
          <h3>Kassensystem</h3>
          <p>Zahlungen erfassen und Register verwalten.</p>
        </header>
        <div className="card-body column">
          <div className="tab-group">
            {(['Hauptkasse', 'Nebenkasse'] as const).map((register) => (
              <button
                key={register}
                type="button"
                className={register === selectedRegister ? 'tab active' : 'tab'}
                onClick={() => selectRegister(register)}
              >
                {register}
              </button>
            ))}
          </div>

          <form className="form-grid" onSubmit={onPaymentSubmit}>
            <Controller
              control={control}
              name="orderId"
              rules={{ required: true }}
              render={({ field }) => (
                <label className="field span-2">
                  <span>Auftrag</span>
                  <select {...field}>
                    <option value="">Auswählen…</option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.orderNumber} · {order.customer.name} · {formatCurrency(order.total)}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
            <Controller
              control={control}
              name="amount"
              rules={{ required: true, min: 0.1 }}
              render={({ field }) => (
                <label className="field">
                  <span>Betrag</span>
                  <input type="number" min={0} step={0.1} {...field} />
                </label>
              )}
            />
            <Controller
              control={control}
              name="method"
              render={({ field }) => (
                <label className="field">
                  <span>Zahlart</span>
                  <select {...field}>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
            <div className="form-actions span-2">
              <button type="submit" className="btn primary">
                Zahlung erfassen
              </button>
            </div>
          </form>

          <div className="tile-grid">
            {paymentMethods.map((method) => (
              <div key={method} className="tile">
                <span className="muted">{method}</span>
                <strong>{formatCurrency(totals.byMethod[method])}</strong>
              </div>
            ))}
          </div>

          <form className="form-grid" onSubmit={onCashSubmit}>
            <Controller
              control={cashControl}
              name="type"
              render={({ field }) => (
                <label className="field">
                  <span>Art</span>
                  <select {...field}>
                    <option value="Einzahlung">Einzahlung</option>
                    <option value="Auszahlung">Auszahlung</option>
                  </select>
                </label>
              )}
            />
            <Controller
              control={cashControl}
              name="amount"
              render={({ field }) => (
                <label className="field">
                  <span>Betrag</span>
                  <input type="number" min={0} step={0.1} {...field} />
                </label>
              )}
            />
            <Controller
              control={cashControl}
              name="method"
              render={({ field }) => (
                <label className="field">
                  <span>Quelle</span>
                  <select {...field}>
                    {[...paymentMethods, 'Sonstiges'].map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
            <Controller
              control={cashControl}
              name="note"
              render={({ field }) => (
                <label className="field span-2">
                  <span>Notiz</span>
                  <input {...field} placeholder="Optional" />
                </label>
              )}
            />
            <div className="form-actions span-2">
              <button type="submit" className="btn">
                Manuelle Buchung
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="card">
        <header>
          <h3>Kassenbuch</h3>
          <p>Alle Buchungen nach Datum überblicken.</p>
        </header>
        <div className="card-body column">
          <div className="tile-grid">
            <div className="tile">
              <span className="muted">Saldo Hauptkasse</span>
              <strong>{formatCurrency(totals.registerTotals.Hauptkasse)}</strong>
            </div>
            <div className="tile">
              <span className="muted">Saldo Nebenkasse</span>
              <strong>{formatCurrency(totals.registerTotals.Nebenkasse)}</strong>
            </div>
          </div>
          <div className="list">
            {cashEntries.map((entry) => (
              <article key={entry.id} className="list-item">
                <div>
                  <h4>{entry.type}</h4>
                  <p className="muted">
                    {format(new Date(entry.createdAt), 'dd.MM.yyyy HH:mm')} · {entry.register}
                  </p>
                  {entry.note != null && entry.note.length > 0 && <p className="muted">{entry.note}</p>}
                </div>
                <strong className={entry.type === 'Einzahlung' ? 'badge success' : 'badge danger'}>
                  {entry.type === 'Einzahlung' ? '+' : '-'}{formatCurrency(entry.amount)}
                </strong>
              </article>
            ))}
            {cashEntries.length === 0 && <p className="muted">Noch keine Buchungen vorhanden.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CashRegister

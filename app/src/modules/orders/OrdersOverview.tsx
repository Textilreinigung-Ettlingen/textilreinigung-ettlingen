import { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { useDataStore } from '../../stores/useDataStore.js'
import type { OrderStatus } from '../../types'
import { formatCurrency } from '../../utils/currency.js'

const statusOptions: OrderStatus[] = ['offen', 'inBearbeitung', 'abholbereit', 'abgeholt']

const OrdersOverview = (): JSX.Element => {
  const orders = useDataStore((state) => state.orders)
  const updateOrderStatus = useDataStore((state) => state.updateOrderStatus)
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'alle'>('alle')
  const [customerFilter, setCustomerFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'alle' || order.status === statusFilter
      const matchesCustomer =
        customerFilter.length === 0 || order.customer.name.toLowerCase().includes(customerFilter.toLowerCase())
      const matchesDate =
        dateFilter.length === 0 || format(new Date(order.createdAt), 'yyyy-MM-dd') === dateFilter
      return matchesStatus && matchesCustomer && matchesDate
    })
  }, [orders, statusFilter, customerFilter, dateFilter])

  return (
    <section className="card">
      <header>
        <h3>Auftragsübersicht</h3>
        <p>Status verfolgen, filtern und Aufträge schnell aktualisieren.</p>
      </header>
      <div className="card-body column">
        <div className="filter-grid">
          <label className="field">
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as OrderStatus | 'alle')}>
              <option value="alle">Alle</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Kund*in</span>
            <input value={customerFilter} onChange={(event) => setCustomerFilter(event.target.value)} placeholder="Suche" />
          </label>
          <label className="field">
            <span>Datum</span>
            <input type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
          </label>
        </div>

        <div className="list">
          {filteredOrders.map((order) => (
            <article key={order.id} className="list-item">
              <div>
                <h4>{order.orderNumber}</h4>
                <p className="muted">
                  Kunde: {order.customer.name} · Auftragswert: {formatCurrency(order.total)}
                </p>
                <p className="muted">
                  Erstellt: {format(new Date(order.createdAt), 'dd.MM.yyyy')} · Abholung: {format(new Date(order.pickupDate), 'dd.MM.yyyy')}
                </p>
              </div>
              <div className="list-actions">
                <select value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)}>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <span className={order.paymentStatus === 'bezahlt' ? 'badge success' : 'badge warning'}>
                  {order.paymentStatus}
                </span>
              </div>
            </article>
          ))}
          {filteredOrders.length === 0 && <p className="muted">Keine Aufträge gefunden.</p>}
        </div>
      </div>
    </section>
  )
}

export default OrdersOverview

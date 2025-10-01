import { Controller, useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { useDataStore } from '../../stores/useDataStore.js'
import type { Complaint } from '../../types'

interface ComplaintForm {
  orderId?: string
  reason: string
  action: string
  cost: number
  notes?: string
}

const ComplaintsModule = (): JSX.Element => {
  const orders = useDataStore((state) => state.orders)
  const complaints = useDataStore((state) => state.complaints)
  const addComplaint = useDataStore((state) => state.addComplaint)
  const updateComplaintStatus = useDataStore((state) => state.updateComplaintStatus)
  const { control, handleSubmit, reset } = useForm<ComplaintForm>({
    defaultValues: { cost: 0 }
  })

  const onSubmit = handleSubmit((values) => {
    addComplaint({ ...values, cost: Number(values.cost), status: 'offen' })
    reset({ cost: 0 })
  })

  return (
    <div className="module-grid">
      <section className="card">
        <header>
          <h3>Reklamation erfassen</h3>
          <p>Grund, Maßnahme, Status und Kosten dokumentieren.</p>
        </header>
        <div className="card-body">
          <form className="form-grid" onSubmit={onSubmit}>
            <Controller
              control={control}
              name="orderId"
              render={({ field }) => (
                <label className="field span-2">
                  <span>Auftrag</span>
                  <select {...field}>
                    <option value="">Kein Auftrag</option>
                    {orders.map((order) => (
                      <option key={order.id} value={order.id}>
                        {order.orderNumber} · {order.customer.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            />
            <Controller
              control={control}
              name="reason"
              rules={{ required: true }}
              render={({ field }) => (
                <label className="field">
                  <span>Grund</span>
                  <input {...field} required />
                </label>
              )}
            />
            <Controller
              control={control}
              name="action"
              rules={{ required: true }}
              render={({ field }) => (
                <label className="field">
                  <span>Maßnahme</span>
                  <input {...field} required />
                </label>
              )}
            />
            <Controller
              control={control}
              name="cost"
              render={({ field }) => (
                <label className="field">
                  <span>Kosten</span>
                  <input type="number" min={0} step={0.1} {...field} />
                </label>
              )}
            />
            <Controller
              control={control}
              name="notes"
              render={({ field }) => (
                <label className="field span-2">
                  <span>Notizen</span>
                  <textarea {...field} rows={3} placeholder="Zusätzliche Informationen" />
                </label>
              )}
            />
            <div className="form-actions span-2">
              <button type="submit" className="btn primary">
                Reklamation speichern
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="card">
        <header>
          <h3>Reklamationsübersicht</h3>
          <p>Bearbeitungsstand im Blick behalten.</p>
        </header>
        <div className="card-body column">
          <div className="list">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="list-item">
                <div>
                  <h4>{complaint.reason}</h4>
                  <p className="muted">
                    Maßnahme: {complaint.action} · Kosten: {complaint.cost.toFixed(2)} €
                  </p>
                  <p className="muted">
                    Erstellt: {format(new Date(complaint.createdAt), 'dd.MM.yyyy HH:mm')} · Status: {complaint.status}
                  </p>
                  {complaint.notes != null && complaint.notes.length > 0 && (
                    <p className="muted">Notizen: {complaint.notes}</p>
                  )}
                </div>
                <div className="action-group">
                  {(['offen', 'inBearbeitung', 'abgeschlossen'] as Complaint['status'][]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={status === complaint.status ? 'btn primary' : 'btn'}
                      onClick={() => updateComplaintStatus(complaint.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </article>
            ))}
            {complaints.length === 0 && <p className="muted">Keine Reklamationen vorhanden.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ComplaintsModule

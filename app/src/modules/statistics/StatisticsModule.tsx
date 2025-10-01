import { useMemo, useState } from 'react'
import { useDataStore } from '../../stores/useDataStore.js'
import type { StatisticsFilters } from '../../types'
import { formatCurrency } from '../../utils/currency.js'

const ranges: StatisticsFilters['range'][] = ['tag', 'woche', 'monat', 'quartal', 'jahr']

const StatisticsModule = (): JSX.Element => {
  const computeStatistics = useDataStore((state) => state.computeStatistics)
  const orders = useDataStore((state) => state.orders)
  const [filters, setFilters] = useState<StatisticsFilters>({ range: 'monat' })

  const summary = useMemo(() => computeStatistics(filters), [computeStatistics, filters])

  return (
    <section className="card">
      <header>
        <h3>Statistiken</h3>
        <p>Zeitraum wählen und Kennzahlen analysieren.</p>
      </header>
      <div className="card-body column">
        <div className="filter-grid">
          <label className="field">
            <span>Zeitraum</span>
            <select
              value={filters.range}
              onChange={(event) => setFilters((prev) => ({ ...prev, range: event.target.value as StatisticsFilters['range'] }))}
            >
              {ranges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Von</span>
            <input
              type="date"
              value={filters.from ?? ''}
              onChange={(event) => setFilters((prev) => ({ ...prev, from: event.target.value }))}
            />
          </label>
          <label className="field">
            <span>Bis</span>
            <input
              type="date"
              value={filters.to ?? ''}
              onChange={(event) => setFilters((prev) => ({ ...prev, to: event.target.value }))}
            />
          </label>
        </div>

        <div className="tile-grid">
          <div className="tile">
            <span className="muted">Umsatz</span>
            <strong>{formatCurrency(summary.revenue)}</strong>
          </div>
          <div className="tile">
            <span className="muted">Aufträge</span>
            <strong>{summary.orderCount}</strong>
          </div>
          <div className="tile">
            <span className="muted">Ø Auftragswert</span>
            <strong>{formatCurrency(summary.averageOrderValue)}</strong>
          </div>
          <div className="tile">
            <span className="muted">Artikelanzahl</span>
            <strong>{summary.itemsProcessed}</strong>
          </div>
        </div>

        <div className="tile-grid">
          <div className="tile">
            <span className="muted">Provision 45%</span>
            <strong>{formatCurrency(summary.provision45)}</strong>
          </div>
          <div className="tile">
            <span className="muted">Provision 55%</span>
            <strong>{formatCurrency(summary.provision55)}</strong>
          </div>
        </div>

        <div className="list">
          {Object.entries(summary.revenueByCategory).map(([category, value]) => (
            <article key={category} className="list-item">
              <div>
                <h4>{category}</h4>
                <p className="muted">Kategorieumsatz</p>
              </div>
              <strong>{formatCurrency(Number(value) || 0)}</strong>
            </article>
          ))}
        </div>

        <p className="muted">{orders.length} Aufträge insgesamt gespeichert.</p>
      </div>
    </section>
  )
}

export default StatisticsModule

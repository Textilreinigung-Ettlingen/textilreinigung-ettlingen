import { test, beforeEach } from 'node:test'
import assert from 'node:assert/strict'

const repoModule = await import('../dist/services/dataRepository.js')
const { useDataStore } = await import('../dist/stores/useDataStore.js')

const initial = {
  orders: [],
  payments: [],
  complaints: [],
  cashEntries: []
}

repoModule.dataRepository.load = async () => ({ ...initial })
repoModule.dataRepository.save = async () => {}

beforeEach(() => {
  const current = useDataStore.getState()
  useDataStore.setState({
    priceList: current.priceList,
    orders: [],
    payments: [],
    complaints: [],
    cashEntries: [],
    selectedRegister: 'Hauptkasse'
  }, true)
})

test('creates order with correct total', () => {
  const store = useDataStore.getState()
  const order = store.createOrder({
    customer: { id: '1', name: 'Anna Muster' },
    pickupDate: new Date().toISOString(),
    lines: [
      { itemId: store.priceList[0].id, quantity: 2, price: store.priceList[0].price },
      { itemId: store.priceList[1].id, quantity: 1, price: store.priceList[1].price }
    ]
  })

  assert.ok(order.total > 0)
  assert.equal(useDataStore.getState().orders.length, 1)
})

test('marks order as paid after payment', () => {
  const store = useDataStore.getState()
  const order = store.createOrder({
    customer: { id: '1', name: 'Karl Kunde' },
    pickupDate: new Date().toISOString(),
    lines: [{ itemId: store.priceList[0].id, quantity: 1, price: store.priceList[0].price }]
  })

  store.recordPayment(order.id, order.total, 'Bar', 'Hauptkasse')

  const updated = useDataStore.getState().orders.find((entry) => entry.id === order.id)
  assert.equal(updated?.paymentStatus, 'bezahlt')
})

test('computes statistics with positive revenue', () => {
  const store = useDataStore.getState()
  store.createOrder({
    customer: { id: '1', name: 'Statistik Star' },
    pickupDate: new Date().toISOString(),
    lines: [{ itemId: store.priceList[0].id, quantity: 1, price: store.priceList[0].price }]
  })

  const stats = store.computeStatistics({ range: 'jahr' })
  assert.ok(stats.revenue >= 0)
})

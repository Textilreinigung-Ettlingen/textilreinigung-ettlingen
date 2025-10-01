import { createStore } from './createStore.js'
import { dataRepository } from '../services/dataRepository.js'
import { generateOrderNumber } from '../utils/orders.js'
import type {
  CashEntry,
  Complaint,
  Customer,
  Order,
  OrderLine,
  Payment,
  PaymentMethod,
  PriceItem,
  StatisticsFilters,
  StatisticsSummary
} from '../types'

const priceList: PriceItem[] = [
  { id: 'anzug', name: 'Anzug 2-teilig', price: 14.5, category: 'Reinigung' },
  { id: 'hemd', name: 'Hemd', price: 2.8, category: 'Wäsche' },
  { id: 'vorhang', name: 'Vorhang', price: 12.9, category: 'Service' },
  { id: 'impragnierung', name: 'Imprägnierung', price: 9.5, category: 'Extras' },
  { id: 'verkauf-buerste', name: 'Kleiderbürste', price: 6.5, category: 'Verkauf' }
]

type Register = 'Hauptkasse' | 'Nebenkasse'

interface DataStoreState {
  priceList: PriceItem[]
  orders: Order[]
  payments: Payment[]
  complaints: Complaint[]
  cashEntries: CashEntry[]
  selectedRegister: Register
  loadInitialData: () => Promise<void>
  createOrder: (input: {
    customer: Customer
    lines: OrderLine[]
    pickupDate: string
    notes?: string
  }) => Order
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  recordPayment: (orderId: string, amount: number, method: PaymentMethod, register: Register) => void
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt'>) => Complaint
  updateComplaintStatus: (id: string, status: Complaint['status']) => void
  addCashEntry: (entry: Omit<CashEntry, 'id' | 'createdAt'>) => CashEntry
  selectRegister: (register: Register) => void
  computeStatistics: (filters: StatisticsFilters) => StatisticsSummary
}

const defaultSummary: StatisticsSummary = {
  revenue: 0,
  orderCount: 0,
  averageOrderValue: 0,
  provision45: 0,
  provision55: 0,
  revenueByCategory: {
    Reinigung: 0,
    Wäsche: 0,
    Extras: 0,
    Service: 0,
    Verkauf: 0
  },
  itemsProcessed: 0
}

export const useDataStore = createStore<DataStoreState>((set, get) => ({
    priceList,
    orders: [],
    payments: [],
    complaints: [],
    cashEntries: [],
    selectedRegister: 'Hauptkasse',
    loadInitialData: async () => {
      const persisted = await dataRepository.load()
      set({
        orders: persisted.orders,
        payments: persisted.payments,
        complaints: persisted.complaints,
        cashEntries: persisted.cashEntries
      })
    },
    createOrder: ({ customer, lines, pickupDate, notes }) => {
      const total = lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
      const orderNumber = generateOrderNumber()
      const order: Order = {
        id: crypto.randomUUID(),
        orderNumber,
        createdAt: new Date().toISOString(),
        pickupDate,
        status: 'offen',
        customer,
        lines,
        total,
        paymentStatus: 'offen',
        qrCode: JSON.stringify({
          orderNumber,
          pickupDate,
          customer: customer.name
        }),
        notes
      }

      set((state) => {
        const orders = [...state.orders, order]
        void dataRepository.save({ orders })
        return { orders }
      })

      return order
    },
    updateOrderStatus: (orderId, status) => {
      set((state) => {
        const orders = state.orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status
              }
            : order
        )
        void dataRepository.save({ orders })
        return { orders }
      })
    },
    recordPayment: (orderId, amount, method, register) => {
      const payment: Payment = {
        id: crypto.randomUUID(),
        orderId,
        amount,
        method,
        createdAt: new Date().toISOString(),
        register,
        notes: register === 'Nebenkasse' ? 'Nebenkasse' : undefined
      }

      set((state) => {
        const payments = [...state.payments, payment]
        const orders = state.orders.map((order) => {
          if (order.id !== orderId) return order
          const alreadyPaid = state.payments
            .filter((p) => p.orderId === orderId)
            .reduce((sum, p) => sum + p.amount, 0)
          const newTotal = alreadyPaid + amount
          const paymentStatus: Order['paymentStatus'] = newTotal >= order.total ? 'bezahlt' : 'teilweise'
          return {
            ...order,
            paymentStatus,
            paymentMethod: method
          }
        })

        const cashEntry: CashEntry = {
          id: payment.id,
          type: 'Einzahlung',
          amount,
          method,
          createdAt: payment.createdAt,
          register,
          note: payment.notes
        }
        const cashEntries = [...state.cashEntries, cashEntry]

        void dataRepository.save({ payments, orders, cashEntries })
        return { payments, orders, cashEntries }
      })
    },
    addComplaint: (complaint) => {
      const record: Complaint = {
        ...complaint,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
      set((state) => {
        const complaints = [...state.complaints, record]
        void dataRepository.save({ complaints })
        return { complaints }
      })
      return record
    },
    updateComplaintStatus: (id, status) => {
      set((state) => {
        const complaints = state.complaints.map((complaint) =>
          complaint.id === id
            ? {
                ...complaint,
                status
              }
            : complaint
        )
        void dataRepository.save({ complaints })
        return { complaints }
      })
    },
    addCashEntry: (entry) => {
      const cashEntry: CashEntry = {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      }
      set((state) => {
        const cashEntries = [...state.cashEntries, cashEntry]
        void dataRepository.save({ cashEntries })
        return { cashEntries }
      })
      return cashEntry
    },
    selectRegister: (register) => set({ selectedRegister: register }),
    computeStatistics: (filters) => {
      const { orders, payments } = get()
      if (orders.length === 0) return defaultSummary

      const now = new Date()
      let start = new Date()
      switch (filters.range) {
        case 'tag':
          start.setHours(0, 0, 0, 0)
          break
        case 'woche':
          start.setDate(now.getDate() - 7)
          break
        case 'monat':
          start.setMonth(now.getMonth() - 1)
          break
        case 'quartal':
          start.setMonth(now.getMonth() - 3)
          break
        case 'jahr':
          start.setFullYear(now.getFullYear() - 1)
          break
      }

      const end = filters.to != null ? new Date(filters.to) : now
      if (filters.from != null) {
        start = new Date(filters.from)
      }

      const inRange = orders.filter((order) => {
        const created = new Date(order.createdAt)
        return created >= start && created <= end
      })

      if (inRange.length === 0) {
        return defaultSummary
      }

      const revenue = inRange.reduce((sum, order) => sum + order.total, 0)
      const orderCount = inRange.length
      const averageOrderValue = revenue / orderCount
      const provision45 = revenue * 0.45
      const provision55 = revenue * 0.55

      const revenueByCategory = inRange.reduce((acc, order) => {
        order.lines.forEach((line) => {
          const item = priceList.find((p) => p.id === line.itemId)
          if (item != null) {
            acc[item.category] += line.price * line.quantity
          }
        })
        return acc
      },
      {
        Reinigung: 0,
        Wäsche: 0,
        Extras: 0,
        Service: 0,
        Verkauf: 0
      } as StatisticsSummary['revenueByCategory'])

      const itemsProcessed = inRange.reduce(
        (sum, order) => sum + order.lines.reduce((count, line) => count + line.quantity, 0),
        0
      )

      return {
        revenue,
        orderCount,
        averageOrderValue,
        provision45,
        provision55,
        revenueByCategory,
        itemsProcessed
      }
    }
}))

export type { PriceItem }
export type { StatisticsSummary }

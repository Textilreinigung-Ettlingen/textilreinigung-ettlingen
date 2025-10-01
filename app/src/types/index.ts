export type OrderStatus = 'offen' | 'inBearbeitung' | 'abholbereit' | 'abgeholt'

export interface PriceItem {
  id: string
  name: string
  category: 'Reinigung' | 'Wäsche' | 'Extras' | 'Service' | 'Verkauf'
  price: number
}

export interface OrderLine {
  itemId: string
  quantity: number
  price: number
  notes?: string
}

export interface Customer {
  id: string
  name: string
  phone?: string
  email?: string
}

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  pickupDate: string
  status: OrderStatus
  customer: Customer
  lines: OrderLine[]
  total: number
  paymentStatus: 'offen' | 'teilweise' | 'bezahlt'
  paymentMethod?: PaymentMethod
  qrCode: string
  notes?: string
}

export type PaymentMethod = 'Bar' | 'EC' | 'Bank' | 'Wise' | 'Kreditkarte'

export interface Payment {
  id: string
  orderId?: string
  amount: number
  method: PaymentMethod
  createdAt: string
  notes?: string
  register: 'Hauptkasse' | 'Nebenkasse'
}

export interface Complaint {
  id: string
  orderId?: string
  reason: string
  action: string
  status: 'offen' | 'inBearbeitung' | 'abgeschlossen'
  cost: number
  notes?: string
  createdAt: string
}

export interface CashEntry {
  id: string
  type: 'Einzahlung' | 'Auszahlung'
  amount: number
  method: PaymentMethod | 'Sonstiges'
  createdAt: string
  register: 'Hauptkasse' | 'Nebenkasse'
  note?: string
}

export interface StatisticsFilters {
  range: 'tag' | 'woche' | 'monat' | 'quartal' | 'jahr'
  from?: string
  to?: string
}

export interface StatisticsSummary {
  revenue: number
  orderCount: number
  averageOrderValue: number
  provision45: number
  provision55: number
  revenueByCategory: Record<PriceItem['category'], number>
  itemsProcessed: number
}

export interface PersistedState {
  orders: Order[]
  payments: Payment[]
  complaints: Complaint[]
  cashEntries: CashEntry[]
}

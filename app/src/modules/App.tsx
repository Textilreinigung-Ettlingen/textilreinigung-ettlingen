import { useEffect, useMemo, useState } from 'react'
import AppLayout from '../components/AppLayout.js'
import OrderIntake from './orders/OrderIntake.js'
import OrdersOverview from './orders/OrdersOverview.js'
import CashRegister from './cash/CashRegister.js'
import ComplaintsModule from './complaints/ComplaintsModule.js'
import StatisticsModule from './statistics/StatisticsModule.js'
import { useDataStore } from '../stores/useDataStore.js'

export type ViewKey =
  | 'auftragsannahme'
  | 'auftragsuebersicht'
  | 'kasse'
  | 'reklamationen'
  | 'statistik'

const App = (): JSX.Element => {
  const loadInitialData = useDataStore((state) => state.loadInitialData)
  const [view, setView] = useState<ViewKey>('auftragsannahme')

  useEffect(() => {
    void loadInitialData()
  }, [loadInitialData])

  const content = useMemo(() => {
    switch (view) {
      case 'auftragsannahme':
        return <OrderIntake />
      case 'auftragsuebersicht':
        return <OrdersOverview />
      case 'kasse':
        return <CashRegister />
      case 'reklamationen':
        return <ComplaintsModule />
      case 'statistik':
        return <StatisticsModule />
      default:
        return null
    }
  }, [view])

  return (
    <AppLayout activeView={view} onNavigate={setView}>
      {content}
    </AppLayout>
  )
}

export default App

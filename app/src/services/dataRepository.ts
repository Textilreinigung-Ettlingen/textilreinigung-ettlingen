import type { PersistedState } from '../types'
import { firebaseRepository } from './firebaseClient.js'

const STORAGE_KEY = 'textilreinigung-ettlingen-state'

const defaultState: PersistedState = {
  orders: [],
  payments: [],
  complaints: [],
  cashEntries: []
}

export class DataRepository {
  async load(): Promise<PersistedState> {
    const local = this.loadLocal()

    if (firebaseRepository.enabled) {
      try {
        const remote = await firebaseRepository.load()
        return {
          ...defaultState,
          ...local,
          ...remote
        }
      } catch (error) {
        console.warn('Firestore laden fehlgeschlagen', error)
      }
    }

    return { ...defaultState, ...local }
  }

  async save(partial: Partial<PersistedState>): Promise<void> {
    const current = this.loadLocal()
    const merged: PersistedState = {
      ...current,
      ...partial
    }

    this.saveLocal(merged)

    if (firebaseRepository.enabled) {
      await Promise.all(
        (Object.keys(partial) as (keyof PersistedState)[]).map(async (key) => {
          const data = merged[key]
          await firebaseRepository.save(key, data)
        })
      )
    }
  }

  private loadLocal(): PersistedState {
    if (typeof window === 'undefined') {
      return defaultState
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw == null) {
        return defaultState
      }
      const parsed = JSON.parse(raw) as PersistedState
      return { ...defaultState, ...parsed }
    } catch (error) {
      console.warn('Konnte lokalen Zustand nicht lesen', error)
      return defaultState
    }
  }

  private saveLocal(state: PersistedState): void {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }
}

export const dataRepository = new DataRepository()

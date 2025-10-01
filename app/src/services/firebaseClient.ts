import type { PersistedState } from '../types'

interface FirestoreConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
}

export class FirebaseRepository {
  private app?: any
  private db?: any
  private firestoreApi?: {
    collection: any
    getDocs: any
    setDoc: any
    doc: any
  }
  private readonly config?: FirestoreConfig
  private initialized = false
  private initPromise?: Promise<void>

  constructor() {
    const configEnv = typeof process !== 'undefined' ? process.env?.FIREBASE_CONFIG ?? '' : ''

    if (configEnv.length === 0) {
      this.initialized = true
      return
    }

    try {
      this.config = JSON.parse(configEnv) as FirestoreConfig
    } catch (error) {
      console.warn('Konnte Firebase-Konfiguration nicht lesen', error)
      this.initialized = true
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (this.initialized) return
    if (this.initPromise) {
      await this.initPromise
      return
    }

    if (this.config == null) {
      this.initialized = true
      return
    }

    this.initPromise = (async () => {
      try {
        const [{ initializeApp }, firestore] = await Promise.all([
          import('firebase/app'),
          import('firebase/firestore')
        ])

        this.app = initializeApp(this.config)
        this.db = firestore.getFirestore(this.app)
        this.firestoreApi = {
          collection: firestore.collection,
          getDocs: firestore.getDocs,
          setDoc: firestore.setDoc,
          doc: firestore.doc
        }
      } catch (error) {
        console.warn('Konnte Firebase nicht initialisieren', error)
      } finally {
        this.initialized = true
      }
    })()

    await this.initPromise
  }

  get enabled(): boolean {
    return this.config != null
  }

  async load(): Promise<Partial<PersistedState>> {
    await this.ensureInitialized()
    if (this.db == null || this.firestoreApi == null) return {}

    const collections = ['orders', 'payments', 'complaints', 'cashEntries'] as const
    const result: Partial<PersistedState> = {}

    for (const col of collections) {
      const snapshot = await this.firestoreApi.getDocs(this.firestoreApi.collection(this.db, col))
      result[col] = snapshot.docs.map((doc) => doc.data()) as any
    }

    return result
  }

  async save(collectionName: keyof PersistedState, data: PersistedState[typeof collectionName]): Promise<void> {
    await this.ensureInitialized()
    if (this.db == null || this.firestoreApi == null) return

    const targetCollection = this.firestoreApi.collection(this.db, collectionName)
    const batch = data.map(async (item) => {
      const document = this.firestoreApi!.doc(targetCollection, item.id)
      await this.firestoreApi!.setDoc(document, item)
    })

    await Promise.all(batch)
  }
}

export const firebaseRepository = new FirebaseRepository()

declare module 'react' {
  export type ReactNode = any
  export function useState<T = any>(initial: T): [T, (value: T | ((prev: T) => T)) => void]
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
  export function useMemo<T>(factory: () => T, deps: any[]): T
  export function useCallback<T extends (...args: any[]) => any>(fn: T, deps: any[]): T
  const React: any
  export default React
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
  export const Fragment: any
}

declare module 'react-dom/client' {
  export function createRoot(container: any): { render: (node: any) => void }
}

declare module 'react-hook-form' {
  export const Controller: any
  export function useForm<T>(options?: any): any
}

declare module 'date-fns' {
  export function format(date: Date, formatStr: string): string
}

declare module 'html5-qrcode' {
  export class Html5Qrcode {
    constructor(elementId: string)
    start(camera: any, config: any, onSuccess: (decodedText: string) => void): Promise<void>
    stop(): Promise<void>
    clear(): void
  }
}

declare module 'qrcode.react' {
  export const QRCodeCanvas: any
}

declare module 'firebase/app' {
  export const initializeApp: any
  export type FirebaseApp = any
}

declare module 'firebase/firestore' {
  export const getFirestore: any
  export type Firestore = any
  export const collection: any
  export const getDocs: any
  export const setDoc: any
  export const doc: any
}

declare module 'zustand' {
  export function create<T>(initializer?: any): any
}

declare module 'zustand/middleware' {
  export const devtools: any
}

declare const process: any

declare namespace Electron {
  interface WebContentsPrintOptions {
    [key: string]: any
  }
}

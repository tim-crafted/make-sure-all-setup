import { createContext } from 'react'

type ContextContent =
  | {
      varient: 'POPULATED'
      adapters: {
        makeCall: () => void
        subscribe: (sub: (data: string) => void) => () => void
      }
    }
  | { varient: 'EMPTY' }

const context = createContext<ContextContent>({ varient: 'EMPTY' })

export { context }

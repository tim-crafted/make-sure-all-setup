import React from 'react'
import { context } from './adapterContext'

const AdapterProvider: React.FC<{
  networkThing: { makeCall: () => void }
  subscribe: (callback: (data: string) => void) => () => void
}> = ({ networkThing, subscribe, children }) => {
  const ContextComponent = context

  return (
    <ContextComponent.Provider
      value={{ varient: 'POPULATED', adapters: { ...networkThing, subscribe } }}
    >
      {children}
    </ContextComponent.Provider>
  )
}

export { AdapterProvider }

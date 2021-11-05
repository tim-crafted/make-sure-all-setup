import React, { useEffect, useState } from 'react'
import './App.css'
import { UseCallbackComponent } from './useCallbackExamples/Component'
import { AdapterProvider } from './useContextExamples/AdapterProvider'
import { useAdapters } from './useContextExamples/useAdapter'

type Subscriber = (data: string) => void
const getSubscription = () => {
  const data: string[] = ['hi', 'how', 'are', 'you', '?']
  const subscribers: { [key: string]: Subscriber } = {}
  let count = 0

  return {
    subscribe: (subscriber: Subscriber) => {
      const key = `${count}`
      count += 1
      subscribers[key] = subscriber

      return () => {
        console.log(`Removing subscription id -> ${key}`)
        delete subscribers[key]
      }
    },
    start: () => {
      let index = 0
      setInterval(() => {
        const keys = Object.keys(subscribers)
        if (keys.length > 0) {
          keys.forEach((key) => {
            const subscriber = subscribers[key]
            if (subscriber) {
              subscriber(data[index])
            }
          })
          index = (index + 1) % data.length
        }
      }, 1000)
    }
  }
}

const UseTheNetworkThing: React.FC = () => {
  const adapters = useAdapters()
  const [data, setData] = useState<string>('')
  useEffect(() => {
    if (adapters.varient === 'POPULATED') {
      return adapters.adapters.subscribe(setData)
    }

    return () => { console.log('unmounting but nothing to cleanup') }
  }, [adapters])

  if (adapters.varient === 'EMPTY') {
    return <></>
  }

  return <div>{data}</div>
}

const subscription = getSubscription()

const App: React.FC = () => {
  console.log('Rendering....')

  useEffect(() => {
    subscription.start()
  }, [])

  return (
    <div className="App">
      <UseCallbackComponent />
      <AdapterProvider
        networkThing={{
          makeCall: () => console.log('Called the network thing...')
        }}
        subscribe={subscription.subscribe}
      >
        <UseTheNetworkThing />
      </AdapterProvider>
    </div>
  )
}

export default App

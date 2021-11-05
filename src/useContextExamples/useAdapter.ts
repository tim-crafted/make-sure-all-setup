import { useContext } from 'react'
import { context } from './adapterContext'

const useAdapters = () => useContext(context)

export { useAdapters }

import { useReducer } from 'react'

type UseRerenderReturn = () => void

export const useRerender = (): UseRerenderReturn => useReducer(() => ({}), {})[1]

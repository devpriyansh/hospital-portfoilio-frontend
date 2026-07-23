import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook to handle API requests with loading and error states.
 * 
 * @param {Function} apiFunc - The API function from services/api.js to call
 * @param {Array} args - Arguments to pass to the API function
 * @param {boolean} immediate - Whether to execute the request immediately on mount
 * @returns {Object} { data, loading, error, execute }
 */
export function useApi(apiFunc, args = [], immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  // Use JSON.stringify to deep compare arguments and avoid infinite loops
  const argsString = JSON.stringify(args)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const parsedArgs = JSON.parse(argsString)
      const result = await apiFunc(...parsedArgs)
      setData(result.data) // Assuming backend always wraps in { success: true, data: ... }
      return result.data
    } catch (err) {
      setError(err.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunc, argsString])

  useEffect(() => {
    if (immediate) {
      execute().catch(() => {})
    }
  }, [execute, immediate])

  return { data, loading, error, execute }
}

import { useEffect, useRef, useState } from 'react'

export const useDebounce = (value: string, delay: number) => {
  const timeoutIdRef = useRef<number | null>(null)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    if(timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    timeoutIdRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      if(timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
    }
  }, [value, delay])
  return debouncedValue
}

import { renderHook } from '@testing-library/react'
import { useDeepCompareMemoize } from '../useDeepCompareMemoize'

describe('useDeepCompareMemoize', () => {
  it('should return the same reference if dependencies are deeply equal', () => {
    const dependencies = [1, { foo: 'bar' }, [3, 4]]
    const { result, rerender } = renderHook(() => useDeepCompareMemoize(dependencies))

    expect(result.current).toBe(dependencies)

    // Rerender with the same dependencies
    rerender()

    expect(result.current).toBe(dependencies)
  })

  it('should return a new reference if dependencies are not deeply equal', () => {
    const dependencies1 = [1, { foo: 'bar' }, [3, 4]]
    const dependencies2 = [1, { foo: 'bar' }, [3, 4]]
    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemoize(deps), {
      initialProps: { deps: dependencies1 }
    })

    expect(result.current).toBe(dependencies1)

    // Rerender with different dependencies
    rerender({ deps: dependencies2 })

    expect(result.current).toEqual(dependencies2)
    expect(result.current).not.toBe(dependencies2)
    expect(result.current).toBe(dependencies1)
  })

  it('should return a new reference if dependencies are not deeply equal, custom comparison function', () => {
    const dependencies1 = [1, { foo: 'bar' }, [3, 4]]
    const dependencies2 = [1, { foo: 'bar' }, [3, 4]]
    const deepEqual = (obj1: any, obj2: any): boolean => {
      if (obj1 === obj2) {
        return true
      }

      if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false
      }

      const keys1 = Object.keys(obj1)
      const keys2 = Object.keys(obj2)

      if (keys1.length !== keys2.length) {
        return false
      }

      for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
          return false
        }
      }

      return true
    }
    const { result, rerender } = renderHook(({ deps }) => useDeepCompareMemoize(deps, deepEqual), {
      initialProps: { deps: dependencies1 }
    })

    expect(result.current).toBe(dependencies1)

    // Rerender with different dependencies
    rerender({ deps: dependencies2 })

    expect(result.current).toEqual(dependencies2)
    expect(result.current).not.toBe(dependencies2)
    expect(result.current).toBe(dependencies1)
  })
})

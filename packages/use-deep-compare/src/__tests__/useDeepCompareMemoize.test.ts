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
})

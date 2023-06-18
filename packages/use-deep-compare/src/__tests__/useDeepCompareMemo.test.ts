import { renderHook } from '@testing-library/react'
import { useDeepCompareMemo } from '../index'

describe('useDeepCompareMemo', () => {
  test('should return a memoized value', () => {
    const factory = jest.fn(() => 'value')
    let dependencies = [1, { foo: 'bar' }, [3, 4]]

    const { result, rerender } = renderHook(() => useDeepCompareMemo(factory, dependencies))

    expect(factory).toHaveBeenCalledTimes(1)
    expect(result.current).toBe('value')

    rerender()

    expect(factory).toHaveBeenCalledTimes(1)
    expect(result.current).toBe('value')

    // Modify dependencies
    dependencies = [2, { foo: 'baz' }, [5, 6]]
    rerender()

    expect(factory).toHaveBeenCalledTimes(2)
    expect(result.current).toBe('value')
  })
})

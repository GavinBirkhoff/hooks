import { renderHook, act } from '@testing-library/react'
import { useDeepCompareCallback } from '../index'

describe('useDeepCompareCallback', () => {
  test('useDeepCompareCallback should return a memorized callback', () => {
    const callbackfn = jest.fn()
    let dependencies = [1, { foo: 'bar' }, [3, 4]]

    const { result, rerender } = renderHook(() => useDeepCompareCallback(() => callbackfn(), dependencies))
    const memorizedfn = result.current
    rerender()
    expect(result.current).toBe(memorizedfn)
    result.current()
    expect(callbackfn).toBeCalledTimes(1)
    act(() => {
      dependencies = [1, { foo: 'bar' }, [3, 4]]
      rerender()
    })
    expect(result.current).toBe(memorizedfn)
    // Modify dependencies
    act(() => {
      dependencies = [1, { foo: 'barr' }, [3, 4]]
      rerender()
    })
    expect(result.current).not.toBe(memorizedfn)
    result.current()
    expect(callbackfn).toBeCalledTimes(2)
  })
})

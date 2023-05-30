import { renderHook } from '@testing-library/react'
import useLatest from '../index'

describe('useLatest', () => {
  it('useLatest with basic variable should work', async () => {
    const { result, rerender } = renderHook((state) => useLatest(state), { initialProps: 0 })
    expect(result.current.current).toBe(0)
    rerender(1)
    expect(result.current.current).toBe(1)
  })

  it('useLatest with reference variable should work', async () => {
    const { result, rerender } = renderHook((state) => useLatest(state), { initialProps: {} })
    expect(result.current.current).toEqual({})

    rerender([])
    expect(result.current.current).toEqual([])
  })
})

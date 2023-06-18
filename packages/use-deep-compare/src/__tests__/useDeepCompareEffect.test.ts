import { renderHook, act } from '@testing-library/react'
import { useDeepCompareEffect } from '../index'

describe('useDeepCompareEffect', () => {
  let originalWarn: any
  let mockWarn = jest.fn()

  beforeEach(() => {
    originalWarn = console.warn
    console.warn = mockWarn
  })

  afterEach(() => {
    console.warn = originalWarn
  })

  it('should call effect when dependencies change', () => {
    const effectMock = jest.fn()
    let dependencies = [1, { foo: 'bar' }, [3, 4]]

    const { rerender } = renderHook(() => useDeepCompareEffect(effectMock, dependencies))

    // Modify dependencies
    act(() => {
      dependencies = [2, { foo: 'baz' }, [5, 6]]
      rerender()
    })

    expect(effectMock).toHaveBeenCalledTimes(2)
  })

  it('should not call effect when dependencies remain the same', () => {
    const effectMock = jest.fn()
    const dependencies = [1, { foo: 'bar' }, [3, 4]]

    const { rerender } = renderHook(() => useDeepCompareEffect(effectMock, dependencies))

    // Re-render with the same dependencies
    act(() => {
      rerender()
    })

    expect(effectMock).toHaveBeenCalledTimes(1)
  })

  it('should return a Error if dependencies are empty', () => {
    renderHook(() => useDeepCompareEffect(() => {}, []))
    expect(mockWarn).toHaveBeenCalled()
    // TODO
    // expect(warnMock).toHaveBeenCalledWith(
    //   '[Error: useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.]'
    // )
  })
})

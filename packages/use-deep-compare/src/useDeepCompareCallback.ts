import React from 'react'
import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize'

function useDeepCompareCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: React.DependencyList,
  deepEqual?: (...args: any[]) => boolean
) {
  if (process.env.NODE_ENV === 'development') {
    checkDeps(dependencies, 'useDeepCompareCallback')
  }

  return React.useCallback(callback, useDeepCompareMemoize(dependencies, deepEqual))
}

export default useDeepCompareCallback

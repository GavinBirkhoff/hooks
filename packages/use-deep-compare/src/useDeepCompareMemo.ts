import React from 'react'
import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize'

function useDeepCompareMemo<T>(
  factory: () => T,
  dependencies: React.DependencyList,
  deepEqual?: (...args: any[]) => boolean
) {
  if (process.env.NODE_ENV === 'development') {
    checkDeps(dependencies, 'useDeepCompareMemo')
  }

  return React.useMemo(factory, useDeepCompareMemoize(dependencies, deepEqual))
}

export default useDeepCompareMemo

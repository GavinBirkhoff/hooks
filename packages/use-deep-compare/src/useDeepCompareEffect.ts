import React from 'react'
import { checkDeps, useDeepCompareMemoize } from './useDeepCompareMemoize'

function useDeepCompareEffect(
  effect: React.EffectCallback,
  dependencies: React.DependencyList,
  deepEqual?: (...args: any[]) => boolean
) {
  if (process.env.NODE_ENV === 'development') {
    checkDeps(dependencies, 'useDeepCompareEffect')
  }

  React.useEffect(effect, useDeepCompareMemoize(dependencies, deepEqual))
}

export default useDeepCompareEffect

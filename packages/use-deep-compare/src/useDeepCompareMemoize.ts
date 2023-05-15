import React from 'react'

const isEqual = (prevValue: any, value: any): boolean => {
  return JSON.stringify(prevValue) === JSON.stringify(value)
}

export function checkDeps(deps: React.DependencyList, hookName: string) {
  const reactHookName = `React.${hookName.replace(/DeepCompare/, '')}`

  if (!deps || deps.length === 0) {
    try {
      throw new Error(`${hookName} should not be used with no dependencies. Use ${reactHookName} instead.`)
    } catch (error) {
      console.warn(error)
    }
  }
}

export function useDeepCompareMemoize(value: React.DependencyList, deepEqual = isEqual) {
  const ref = React.useRef<React.DependencyList>([])

  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

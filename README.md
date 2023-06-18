<div align="center">

![Build Status](https://github.com/GavinBirkhoff/hooks/actions/workflows/node-ci.yml/badge.svg)
[![codecov](https://codecov.io/github/GavinBirkhoff/hooks/branch/main/graph/badge.svg)](https://codecov.io/github/GavinBirkhoff/hooks)
![license](https://img.shields.io/github/license/gavinbirkhoff/hooks)

<!-- ![release](https://img.shields.io/github/release/gavinbirkhoff/hooks.svg) -->

</div>

# hooks

A high quality and reliable React Hooks library.

# use-compare

use-compare - React Hooks, except using deep comparison on the inputs, not reference equality. You can customize the comparison function.

# Installation

**npm**

```shell
npm i use-compare
```

**yarn**

```shell
yarn add use-compare
```

**pnpm**

```shell
pnpm add use-compare
```

# Usage

**useDeepCompareEffect**

```jsx
import { useDeepCompareEffect } from 'use-compare'

const Button = ({ object, array }) => {
  useDeepCompareEffect(() => {
    // do something
  }, [object, array])
  return <button>click</button>
}
// Or, You can customize the comparison function.
const isEqual = (prevValue, value) => {
  // do your comparison about prevValue and value to return true or false
  return boolean
}
const Button = ({ object, array }) => {
  useDeepCompareEffect(
    () => {
      // do something
    },
    [object, array],
    isEqual
  )
  return <button>click</button>
}
```

**useDeepCompareCallback**

```jsx
import { useDeepCompareCallback } from 'use-compare'

const Button = ({ object, array }) => {
  useDeepCompareCallback(() => {
    // do something
  }, [object, array])
  return <button>click</button>
}
// Or, You can customize the comparison function.
const isEqual = (prevValue, value) => {
  // do your comparison about prevValue and value to return true or false
  return boolean
}
const Button = ({ object, array }) => {
  useDeepCompareCallback(
    () => {
      // do something
    },
    [object, array],
    isEqual
  )
  return <button>click</button>
}
```

**useDeepCompareMemo**

```jsx
import { useDeepCompareMemo } from 'use-compare'

const Button = ({ object, array }) => {
  useDeepCompareMemo(() => {
    // do something
  }, [object, array])
  return <button>click</button>
}
// Or, You can customize the comparison function.
const isEqual = (prevValue, value) => {
  // do your comparison about prevValue and value to return true or false
  return boolean
}
const Button = ({ object, array }) => {
  useDeepCompareMemo(
    () => {
      // do something
    },
    [object, array],
    isEqual
  )
  return <button>click</button>
}
```

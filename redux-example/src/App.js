import React, { Component, useState } from "react"

import { toFahrenheit, toCelsius } from "./lib"
import { lensPath, over, set, view } from "ramda"

import "./App.css"

const App = () => {
  const initialState = { fahrenheit: 70, other: {} }
  const [state, setState] = useState(initialState)

  // const state = initialState
  // const useLensState = lens => ({
  //   state: view(lens, state),
  //   setState: setState(set(lens))
  // })

  // const lensState = useLensState(lensPath(["fahrenheit"]))

  return (
    <main>
      <pre>{JSON.stringify(state)}</pre>
    </main>
  )
}

export default App

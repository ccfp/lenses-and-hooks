import React, { useState } from "react"
import { __, always, ap, compose, lensPath, over, view } from "ramda"

import CelsiusThermometer from "./Components/CelsiusThermometer"
import { toFahrenheit, toCelsius } from "./lib"

import "./App.css"

const App = () => {
  const initialState = { fahrenheit: 70, other: {} }
  const [state_, setState_] = useState(initialState)
  const useLensState = lens => s => [
    view(lens, s),
    compose(
      setState_,
      over(lens)
    )
  ]

  const [state, setState] = useLensState(lensPath(["fahrenheit"]))(state_)

  return (
    <main>
      <pre>{JSON.stringify(state)}</pre>
      <CelsiusThermometer state={state} setState={setState} />
    </main>
  )
}

export default App

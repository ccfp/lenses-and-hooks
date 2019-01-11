import React, { Component, useState } from "react"
import { compose, lensPath, over, set, view } from "ramda"

import CelsiusThermometer from "./Components/CelsiusThermometer"
import { toFahrenheit, toCelsius } from "./lib"

import "./App.css"

const App = () => {
  const initialState = { fahrenheit: 70, other: {} }
  const [state, setState] = useState(initialState)
  // const useLensState = lens => [
  //   view(lens, state_),
  //   // compose(
  //   //   setState_,
  //   //   set(lens, state_)
  //   // )
  // ]

  // const [state, setState] = useLensState(lensPath(["fahrenheit"]))

  return (
    <main>
      <pre>{JSON.stringify(state)}</pre>
      {/* <CelsiusThermometer state={state} setState={setState} /> */}
    </main>
  )
}

export default App

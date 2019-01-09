import React, { Component, useState } from "react"
import { connect } from "react-redux"

import { toFahrenheit, toCelsius } from "./lib"

import "./App.css"

const App = ({ temperature, onClick }) => {
  return (
    <main>
      <h2>{temperature}</h2>
      <button onClick={onClick}>Click me!</button>
    </main>
  )
}

const mapStateToProps = state => ({ temperature: state.child.fahrenheit })

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch({ type: "INCREMENT" })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

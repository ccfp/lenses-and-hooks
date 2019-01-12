import React, { Component } from "react"
import { mergeLatest } from "./lib"
import { lensPath, set } from "ramda"

import InputGroup from "./components/InputGroup"
import Input from "./components/Input"
import state from "./state"

class App extends Component {
  state = state

  componentDidMount() {
    const fromLocalStorage = JSON.parse(localStorage.getItem("state"))
    this.setState(mergeLatest(fromLocalStorage, state))
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state))
  }

  handleChange = path => value => this.setState(set(lensPath(path), value))
  handleSubmit = () => {
    console.log(this.state)
  }

  toInputGroup = obj =>
    Object.keys(obj).reduce(
      (acc, key) => [
        ...acc,
        typeof obj[key] === "object" ? (
          <InputGroup id={key}>{this.toInputGroup(obj[key])}</InputGroup>
        ) : (
          <Input id={key} />
        )
      ],
      []
    )

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <InputGroup handleChange={this.handleChange} state={this.state}>
            {this.toInputGroup(this.state)}
          </InputGroup>
        </form>
        <pre className="json">{JSON.stringify(this.state, null, 2)}</pre>
      </>
    )
  }
}
export default App

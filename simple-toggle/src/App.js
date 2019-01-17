import React, {
  PureComponent,
  Component,
  createContext,
  useState,
  useEffect
} from "react"
import logo from "./logo.svg"
import "./App.css"
import Toggle from "./Components/Toggle"

const GCContext = createContext()

const Grandchild = () => (
  <GCContext.Consumer>
    {({ grandchild: text, handleChange }) => {
      return (
        <div>
          <input value={text} onChange={handleChange} type="text" />
        </div>
      )
    }}
  </GCContext.Consumer>
)

class Child extends PureComponent {
  componentDidUpdate() {
    console.log("Child updated")
  }
  render() {
    return <Grandchild />
  }
}

const Parent = () => <Child />

function App() {
  const [state, setState] = useState({ on: false })
  const [width, setWidth] = useState(window.innerWidth)

  const [grandchild, setGCState] = useState("Hey I'm a grandchild")

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  const handleClick = () => {
    setState(({ on }) => ({ on: !on }))
  }

  const handleChange = e => {
    setGCState(e.target.value)
  }

  return (
    <GCContext.Provider value={{ grandchild, handleChange }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{width}</p>
          <Parent />
          <Toggle height="3rem" on={state.on} onClick={handleClick} />
        </header>
        <pre>{JSON.stringify(grandchild)}</pre>
      </div>
    </GCContext.Provider>
  )
}

export default App

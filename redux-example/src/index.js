import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"

import "./index.css"
import App from "./App"

const store = createStore(
  (state, action) =>
    action.type === "INCREMENT"
      ? {
          ...state,
          child: {
            ...state.child,
            fahrenheit: state.child.fahrenheit + 5
          }
        }
      : state,
  {
    child: { fahrenheit: 70 }
  }
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

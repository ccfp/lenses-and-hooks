import React from "react"
import { camelToTitle, contramap } from "../lib"

// The `contramap` is not doing much here, just keeping
// it here as a pattern I might revisit :)
export default contramap(props => ({
  ...props,
  label: camelToTitle(props.id)
}))(({ handleChange, state, path, id, label }) => (
  <label key={id}>
    {label}
    <input
      className={state ? null : "empty"}
      onChange={({ target: { value } }) => handleChange(path)(value)}
      value={state}
    />
  </label>
))

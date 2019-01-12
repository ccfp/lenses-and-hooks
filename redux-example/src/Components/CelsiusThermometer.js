import React from "react"
import Thermometer from "react-thermometer-component"

const CelsiusThermometer = ({ state, setState }) => {
  const onColder = () => {
    console.log("HEYE THIS IS STATE", state)

    setState(prev => {
      console.log("HEY iitittts PREV::::", prev)
      return prev - 5
    })
  }
  const onHotter = () => setState(prev => prev + 5)
  return (
    <div>
      <button onClick={onColder}>Colder</button>
      <button onClick={onHotter}>Hotter</button>
      <Thermometer value={state} max="100" steps="4" format="°C" />
    </div>
  )
}

export default CelsiusThermometer

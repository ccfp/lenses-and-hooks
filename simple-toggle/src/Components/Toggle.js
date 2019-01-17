import React, { Component } from "react"
import styled from "styled-components"

const MAINCOLOR = "white"
const SECONDARYCOLOR = "black"
const ONCOLOR = "#fab1a0"
const OFFCOLOR = "#dfe6e9"

const Rect = styled.rect`
  transition: 0.2s ease-out;
`

const SVG = styled.svg`
  display: inline-block;
  height: ${({ height = "auto" }) => height};
`

export default class Toggle extends Component {
  static defaultProps = {
    on: false,
    onClick: () => {}
  }

  generateState = stateName => {
    switch (stateName) {
      case "OFF": {
        return {
          x: 3,
          width: 6,
          fill: OFFCOLOR
        }
      }
      case "ON": {
        return {
          x: 11,
          width: 6,
          fill: ONCOLOR
        }
      }
      case "OFF_TRANSITION": {
        return {
          x: 3,
          width: 8,
          fill: OFFCOLOR
        }
      }
      case "ON_TRANSITION": {
        return {
          x: 9,
          width: 8,
          fill: ONCOLOR
        }
      }
      default: {
        return null
      }
    }
  }

  goToState = stateName => {
    this.setState({
      name: stateName,
      machine: this.generateState(stateName)
    })
  }

  state = {
    mouseDown: false,
    name: "OFF",
    machine: this.generateState("OFF")
  }

  handleMouseUp = e => {
    document.removeEventListener("mouseup", this.handleMouseUp)
    this.setState(() => ({ mouseDown: false }))
    const { id, on } = this.props
    if (
      e.target === this.node ||
      e.target === this.container ||
      e.target === this.svg
    )
      this.props.onClick({ id, on })
    this.props.on ? this.goToState("ON") : this.goToState("OFF")
  }

  handleMouseDown = e => {
    document.addEventListener("mouseup", this.handleMouseUp)
    this.props.on
      ? this.goToState("ON_TRANSITION")
      : this.goToState("OFF_TRANSITION")
    this.setState(() => ({ mouseDown: true }))
  }

  endTransition = () => {
    !this.state.mouseDown &&
      (this.props.on ? this.goToState("ON") : this.goToState("OFF"))
  }

  componentDidMount() {
    const { on } = this.props
    this.setState(() => ({ on }))
    on ? this.goToState("ON") : this.goToState("OFF")
    this.node.addEventListener("transitionend", this.endTransition)
  }

  componentDidUpdate() {
    const { x, width, fill } = this.state.machine
    this.node.setAttribute("x", x)
    this.node.setAttribute("width", width)
    this.container.setAttribute("fill", fill)
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseDown)
  }

  render() {
    const { height } = this.props
    return (
      <SVG
        ref={svg => (this.svg = svg)}
        height={height}
        viewBox="0 0 20 12"
        xmlns="http://www.w3.org/2000/svg"
        onMouseDown={this.handleMouseDown}
      >
        <Rect
          ref={container => (this.container = container)}
          fill={MAINCOLOR}
          stroke={SECONDARYCOLOR}
          strokeWidth="0.5"
          x="2"
          y="2"
          width="16"
          height="8"
          rx="4"
          ry="4"
        />
        <Rect
          ref={node => (this.node = node)}
          fill={MAINCOLOR}
          stroke={SECONDARYCOLOR}
          strokeWidth="0.5"
          x="3"
          y="3"
          width="6"
          height="6"
          rx="3"
          ry="3"
        />
      </SVG>
    )
  }
}

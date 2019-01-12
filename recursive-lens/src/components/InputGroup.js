import React, { Fragment, createElement, cloneElement, Children } from "react"
import { last } from "ramda"
import { camelToTitle, isShallow } from "../lib"

export default ({ children, path = [], state, handleChange }) => (
  <Fragment>
    {last(path)
      ? createElement(
          "section",
          isShallow(state) && {
            className: "deep"
          },

          createElement(
            `h${Math.min(path.length + 1, 6)}`,
            null,
            camelToTitle(last(path))
          ),
          Children.map(children, child =>
            cloneElement(child, {
              ...child.props,
              key: child.props.id,
              path: [...path, child.props.id],
              state: state[child.props.id],
              handleChange
            })
          )
        )
      : Children.map(children, child =>
          cloneElement(child, {
            ...child.props,
            key: child.props.id,
            path: [...path, child.props.id],
            state: state[child.props.id],
            handleChange
          })
        )}
  </Fragment>
)

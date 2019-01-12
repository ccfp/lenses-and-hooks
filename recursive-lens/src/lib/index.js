import { createElement } from "react"
import {
  compose,
  join,
  not,
  map,
  replace,
  split,
  test,
  toLower,
  toUpper
} from "ramda"
export { default as mergeLatest } from "./mergeLatest"

export const contramap = fn => View => props =>
  createElement(View, fn(props), props.children)

export const toMonthString = n => new Date(0, n).toDateString().split(" ")[1]

const words = split(" ")
const unwords = join(" ")
const isUpper = x => test(/[A-Z]/, x) && not(test(/[a-z]/, x))
const capitalize = replace(/\w/, toUpper)

export const camelToTitle = compose(
  capitalize,
  unwords,
  map(x => (isUpper(x) ? x : toLower(x))),
  words,
  replace(/[A-Z]+/g, l => " " + l)
)

export const isShallow = obj =>
  Object.keys(obj).reduce(
    (acc, key) => acc && not(typeof obj[key] === "object"),
    true
  )

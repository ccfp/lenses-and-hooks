//import { isObject } from "./index"

const isObject = x => typeof x === "object"

const mergeLatest = (fromLocal, fromApp) =>
  fromLocal
    ? Object.keys(fromApp).reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            isObject(fromApp[key]) && isObject(fromLocal[key])
              ? mergeLatest(fromLocal[key], fromApp[key])
              : isObject(fromApp[key]) || isObject(fromLocal[key])
                ? fromApp[key]
                : fromLocal[key] || fromApp[key]
        }),
        {}
      )
    : fromApp

export default mergeLatest

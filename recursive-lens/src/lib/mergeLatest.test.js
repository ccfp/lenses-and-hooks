import mergeLatest from "./mergeLatest"

it("mergeLatest overwrites app-defined state with values from local storage, but defers to the structure of the app-defined state object", () => {
  const fromLocal = {
    w: {
      a: "This object will be replaced by a string"
    },
    x: "0",
    y: "This string will be replaced by an object",
    z: {
      a: "Hello",
      b: "Yes"
    }
  }

  const fromApp = {
    w: "Hulllooo!!!",
    x: "1",
    y: {
      a: "Hello from here"
    },
    z: {
      a: "Goodbye",
      c: "Why not?"
    }
  }

  expect(mergeLatest(fromLocal, fromApp)).toEqual({
    w: "Hulllooo!!!",
    x: "0",
    y: {
      a: "Hello from here"
    },
    z: {
      a: "Hello",
      c: "Why not?"
    }
  })
})

it("mergeLatest can handle null from local storage", () => {
  const fromLocal = null

  const fromApp = {
    x: "1",
    y: {
      a: "Hello from here"
    },
    z: {
      a: "Goodbye",
      c: "Why not?"
    }
  }

  expect(mergeLatest(fromLocal, fromApp)).toEqual({
    x: "1",
    y: {
      a: "Hello from here"
    },
    z: {
      a: "Goodbye",
      c: "Why not?"
    }
  })
})

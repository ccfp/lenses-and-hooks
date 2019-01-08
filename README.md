# Lenses 👓 & Hooks 🎣

**🎯 Goals:** The aim of this session/workshop/whatever-it-is is to implement a custom React hook that will utilize lenses for state management. The inspiration is André Staltz's [`use-profunctor-state`](https://github.com/staltz/use-profunctor-state) library. Here's the accompanying talk: ["Profunctor Optics for State Management"](https://www.youtube.com/watch?v=VdiJ_vgVUgs).

To be honest, I don't really know what profunctors are all about ([_and maybe André doesn't either?_](https://www.twitter.com/andrestaltz/status/1063704967209455616)), but I think we should be able to implement something similar with regular old lenses brought in from `ramda` or `partial.lenses`. We could also try implementing our own `set`/`view`/`over` functions from scratch (or, mostly from scratch, as it probably would be easier to rely on optics implementations from one of the above libraries).

The idea is that you can replace Redux with a top-level state object and use lenses to get and set from state. At least, that's the promise, but I don't know---I am still learning Redux so we'll see how this goes 😉.

## Functors
A functor is something that you can define a `map` function for. In JavaScript, the most familiar functor is `Array`:
```javascript
const arrayMap = f => xs => xs.map(f)

const incrementAll = arrayMap(x => x + 1)

incrementAll([1, 2, 3])
// -> [2, 3, 4]  
```

Another one is `Promise`:

```javascript
const promiseMap = f => xs => xs.then(f)

const incrementPromise = promiseMap(x => x + 1)

// Returns a promise that resolves to 2
incrementPromise(Promise.resolve(1))
```


<details>
  <summary>A note about the difference between `.map` and `.then`</summary>

  Note that `.then` is a bit overloaded, because we can also return another `Promise` within and it'll be "flattened":
  ```javascript
  // These are equivalent
  (f => xs => xs.then(f))(x => x + 1)(Promise.resolve(1))
  (f => xs => xs.then(f))(x => Promise.resolve(x + 1))(Promise.resolve(1))
  ```
  👆 This is confusing syntax (I'll try to think of a better way of showing this), but you can copy-paste each line to the console to confirm they evaluate the same.
</details>


And you really _shouldn't do this_, but it's possible to extend the `Object` prototype to have a `map` method on it as well.

```javascript
Object.prototype.map = function(f) {
  return Object.entries(this).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: f(v) }),
    {}
  )
}

const objectMap = f => obj => obj.map(f)

objectMap(x => x + 1)({ foo: 1, bar: 2 })
// -> { foo: 2, bar: 3 }
```

We can also define our own functors. Here's a naive `Identity` implementation:

```javascript
const Identity = x => ({
  map: f => Identity(f(x)),
  value: x
})

Identity(2).map(x => x + 1).value
```

A more robust version using ES6 `class`:

```javascript
class Identity {
  constructor(x) {
    this.getIdentity = () => x
  }
  static of(x) {
    return new Identity(x)
  }
  map(f) {
    return new Identity(f(this.getIdentity()))
  }
}

Identity.of(3).map(x => x + 1).getIdentity()
// -> 4
```

Why am I going on about functors? Turns out that an implementation of lense "getter" and "setter" functions relies on these seemingly useless `Identity` and `Const` functors.
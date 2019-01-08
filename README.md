# Lenses 👓 & Hooks 🎣

**🎯 Goals:** The aim of this session/workshop/whatever-it-is is to implement a custom React hook that will utilize lenses for state management. The inspiration is André Staltz's [`use-profunctor-state`](https://github.com/staltz/use-profunctor-state) library. Here's the accompanying talk: ["Profunctor Optics for State Management"](https://www.youtube.com/watch?v=VdiJ_vgVUgs). To be honest, I don't really know what profunctors are all about ([_and maybe André doesn't either?_](https://www.twitter.com/andrestaltz/status/1063704967209455616)), but I think we should be able to implement something similar with regular old lenses brought in from `ramda` or `partial.lenses`. We could also try implementing our own `set`/`view`/`over` functions from scratch (or, mostly from scratch, as it probably would be easier to rely on optics implementations from one of the above libraries). The idea is that you can replace Redux with a top-level state object and using lenses to get and set from state. At least, that's the promise, but I don't know---I am still learning Redux so we'll see how this goes 😉.

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

const incrementPromiseValue = promiseMap(x => x + 1)

// Returns a promise that resolves to 2
incrementPromisedValue(Promise.resolve(1))
```
<details>
<summary>A note about the difference between `.map` and `.then`<summary>

Note that `.then` is a bit overloaded, because we can also return another `Promise` within and it'll be "flattened":
```javascript
// These are equivalent
(f => xs => xs.then(f))(x => x + 1)(Promise.resolve(1))
(f => xs => xs.then(f))(x => Promise.resolve(x + 1))(Promise.resolve(1))
```
👆 This is confusing syntax (I'll try to think of a better way of showing this), but you can copy-paste each line to the console to confirm they evaluat the same.
</details>

We can also define our own functors. Here's a naive `Identity` implementation:

```javascript
const Identity = x => ({
  map: f => Identity(f(x)),
  value: x
})

Identity(2).map(x => x + 1).value
```

Why am I going on about functors? Turns out that an implementation of lenses relies on a couple functors from 
## Functors

### The `Array` functor

A functor is something that you can define a `map` function for. In JavaScript, the most familiar functor is `Array`:
```javascript
const arrayMap = f => xs => xs.map(f)

const incrementArray = arrayMap(x => x + 1)

incrementArray([1, 2, 3])
// -> [2, 3, 4]  
```

### The `Promise` functor?

Another one is `Promise`:

```javascript
const promiseMap = f => p => p.then(f)

const incrementPromise = promiseMap(x => x + 1)

// Returns a Promise that resolves to 2
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


### The hacky `Object` functor

And you really _shouldn't do this_, but it's possible to extend the `Object` prototype to have a `map` method on it as well.

```javascript
Object.prototype.map = function(f) {
  return Object.entries(this).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: f(v) }),
    {}
  )
}

const objectMap = f => obj => obj.map(f)

const incrementObj = objectMap(x => x + 1)

incrementObj({ foo: 1, bar: 2 })
// -> { foo: 2, bar: 3 }
```

### Custom (but valid) functors

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
    this._value = x
  }
  static of(x) {
    return new Identity(x)
  }
  map(f) {
    return new Identity(f(this._value))
  }
  runIdentity() {
    return this._value
  }
}
```


```js
const identityMap = f => identity => identity.map(f)

const incrementIdentity = identityMap(x => x + 1)

incrementIdentity(Identity.of(3)).runIdentity()
// -> 4
```

Here's a rendition of the `Const` functor (_can you spot the difference?_):

```javascript
class Const {
  constructor(x) {
    this._value = x
  }
  static of(x) {
    return new Const(x)
  }
  map(f) {
    return new Const(this._value)
  }
  getConst() {
    return this._value
  }
}
```


Aside from some slight naming inconsistencies&mdash;why `runIdentity` and `getConst` but not `getConst`, etc. 🤷‍♂️&mdash;the difference is in the respective `map` method. You may already see that but first let's try to generalize how `map` works across all our examples:

```javascript
const arrayMap    = f => xs       => xs.map(f)
const objectMap   = f => obj      => obj.map(f)
const identityMap = f => identity => identity.map(f)
const constMap    = f => cnst     => cnst.map(f)
// We're ignoring Promise for now

```
```js
const constMap = f => constant => constant.map(f)

const incrementConst = constMap(x => x + 1)

incrementConst(Const.of(3)).getConst()
// -> 3
```

### Polymorphic `map`

We can generalize this with a _polymorphic_ `map` that works for **any** Functor (any mappable)



```js
Identity.of(3).map(x => x + 1).runIdentity()
// -> 4
```
Why am I going on about functors? Turns out that an implementation of lense "getter" and "setter" functions relies on these seemingly useless `Identity` and `Const` functors.

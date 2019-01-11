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

class Const {
  constructor(x) {
    this._value = x
  }
  static of(x) {
    return new Const(x)
  }
  // map ignores the function passed to it
  map(_) {
    return new Const(this._value)
  }
  getConst() {
    return this._value
  }
}

const getConst = x => x.getConst()
const runIdentity = x => x.runIdentity()

// Big F for Functor
const map = f => F => F.map(f)

const inc = x => x + 1

map(inc)(Const.of(3)).getConst() //?
map(inc)(Identity.of(3)).runIdentity() //?

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

const getter = (f, x) =>
  compose(
    getConst,
    map(f),
    Const.of
  )(x)

const setter = (f, x) =>
  compose(
    runIdentity,
    map(f),
    Identity.of
  )(x)

const reverse = xs => xs.reverse()

getter(reverse, [1, 2, 3]) //?
setter(reverse, [1, 2, 3]) //?

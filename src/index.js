// const promiseMap = f => p => p.then(f)

// promiseMap(x => x + 1)(Promise.resolve(2))

// const Identity = x => ({
//   map: f => Identity(f(x)),
//   getIdentity: x
// })

// Identity(2).map(x => x + 1).getIdentity

Object.prototype.map = function(f) {
  return Object.entries(this).reduce(
    (acc, [k, v]) => ({ ...acc, [k]: f(v) }),
    {}
  )
}

const objectMap = f => obj => obj.map(f)

objectMap(x => x + 1)({ foo: 1, bar: 2 }) //?

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

// Identity.of = x => new Identity(x)

// class Reader {
//   constructor(f) {
//     this.run = f
//   }
//   map = f => new Reader(x => f(this.run(x)))
//   ap = that => new Reader(x => this.run(x)(that.run(x)))
//   chain = f => new Reader(x => f(this.run(x)).run(x))
//   traverse = f => g => f(this.run).ap(g)
//   static of = x => new Reader(() => x)
//   static ask = () => new Reader(x => x)
// }

Identity.of(3)
  .map(x => x + 1)
  .getIdentity() //?

const promiseMap = f => p => p.then(f)

promiseMap(x => x + 1)

const Identity = x => ({
  map: f => Identity(f(x)),
  getIdentity: x
})

Identity(2).map(x => x + 1).getIdentity

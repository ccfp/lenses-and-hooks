const test = require("tape")
const tapDiff = require("tap-diff")

// test
//   .createStream()
//   .pipe(tapDiff())
//   .pipe(process.stdout)

test("isCryptSolution", t => {
  t.plan(1)
  t.equal(false, true)
})

// test("timing test", t => {
//   t.plan(4)
//   t.equal(typeof Date.now, "function")
//   var start = Date.now()

//   setTimeout(() => {
//     t.equal(Date.now() - start, 400)
//   }, 100)
// })

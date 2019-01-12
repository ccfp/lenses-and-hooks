import { range } from "ramda"
import { toMonthString } from "../lib"

export default {
  name: {
    first: "Jane",
    last: "Doe"
  },
  address: {
    home: {
      street: {
        number: "23",
        name: "Elm",
        direction: "West"
      },
      city: "Saskatoon",
      state: "Saskatchewan",
      postalCode: "999999"
    },
    business: {
      street: "8 Main St",
      city: "Tuscaloosa",
      state: "Alabama",
      postalCode: "123456"
    }
  },
  utilityBill: Object.assign(
    {},
    ...range(0, 12).map(m => ({ [toMonthString(m)]: "" }))
  )
}

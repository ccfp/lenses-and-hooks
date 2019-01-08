import * as L from "partial.lenses"
import * as R from "ramda"

const sampleTitles = {
  titles: [
    { language: "en", text: "Title" },
    { language: "sv", text: "Rubrik" }
  ]
}

// L.get(L.prop("titles"), sampleTitles)
// L.get(
// L.compose(
//   L.prop("titles"),
//   L.index(0)
// ),
// sampleTitles
// ) //?

// L.set(
//   L.compose(
//     L.prop("titles"),
//     L.index(0),
//     L.prop("text")
//   ),
//   "New title",
//   sampleTitles
// ) //?

// const textIn = language =>
//   L.compose(
//     L.prop("titles"),
//     L.normalize(R.sortBy(L.get("language"))),
//     L.find(R.whereEq({ language })),
//     L.valueOr({ language, text: "" }),
//     L.removable("text"),
//     L.prop("text")
//   )

// L.remove(textIn("sv"), sampleTitles) //?

const Title = {
  text: [L.removable("text"), "text"]
}

const Titles = {
  titleIn: language => [
    L.find(R.whereEq({ language })),
    L.valueOr({ language, text: "" })
  ]
}

const Model = {
  titles: ["titles", L.normalize(R.sortBy(L.get("language")))],
  textIn: language => [Model.titles, Titles.titleIn(language), Title.text]
}

L.get(Model.textIn("sv"), sampleTitles) //?

const texts = [Model.titles, L.elems, Title.text]

L.collect(texts, sampleTitles) //?

L.maximumBy(R.length, texts, sampleTitles) //?

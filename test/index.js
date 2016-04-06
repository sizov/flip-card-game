import test from "tape"
import flipCardGame from "../src"

test("flipCardGame", (t) => {
  t.plan(1)
  t.equal(true, flipCardGame(), "return true")
})

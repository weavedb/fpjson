import assert from "assert"
import fpj from "../src/index.mjs"
import { expect } from "chai"

const cases = [[null, null]]

describe("FPJSON", function () {
  it(`should define variables`, () => {
    console.log(fpj(["add", 1, 2]))
    console.log(fpj(["add", ["$", "test"], 2], { test: 3 }))
    console.log(fpj([["anyPass", ["[]", ["lte", 2], ["gt", 2]]], -3]))
    console.log(fpj(["test", ["reg", "a", "i"], "ABC"]))
    console.log("what", fpj(["add", ["$", "a"], 3], { a: 3 }))

    console.log(
      "what",
      fpj([["pipe", ["add", 1], ["let", "num1"], ["var", "num1"]], 1]),
    )
    let vars = {}
    console.log(fpj(["let", "num1", 1], vars)) // vars = { "num1" : 1 }
    console.log(fpj(["add", ["var", "num1", true], 1], vars)) // 2
  })
})

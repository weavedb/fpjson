import assert from "assert"
import fpjson from "../src/index.mjs"
import { expect } from "chai"
import { funcs, get } from "./query.mjs"

const cases = [[null, null]]

describe("FPJSON", function () {
  let i = 0
  for (const k in funcs) {
    let i2 = 0
    for (const v of funcs[k]) {
      const fname = `fn-${k}-0-${i2++}`
      for (const i3 of Array(10).keys()) {
        const { f, tags } = get(fname)
        const val = fpjson(f)
        it(`Case #${i++}: ${JSON.stringify(f)} = ${JSON.stringify(val)}`, () =>
          expect(val).to.eql(val))
      }
    }
  }

  for (const v of cases) {
    it(`Case #${i++}: ${JSON.stringify(v[0])} = ${JSON.stringify(v[1])}`, () =>
      expect(fpjson(v[0])).to.eql(v[1]))
  }

  it(`should define variables`, () => {
    let store = {}
    expect(fpjson(["let", "n", 1], store)).to.eql(1)
    expect(store).to.eql({ n: 1 })
    expect(fpjson(["var", "n", true], store)).to.eql(1)
    expect(fpjson(["$", "n"], store)).to.eql(1)
    expect(fpjson(["add", ["$", "n"], 1], store)).to.eql(2)

    expect(fpjson(["let", "o", { n: 1 }], store)).to.eql({ n: 1 })
    expect(store).to.eql({ n: 1, o: { n: 1 } })
    expect(fpjson(["var", "o.n", true], store)).to.eql(1)
    expect(fpjson(["$", "o.n"], store)).to.eql(1)

    expect(fpjson(["let", "ln", "n"], store)).to.eql("n")
    expect(fpjson(["var", "$ln", true], store)).to.eql(1)
    expect(fpjson(["$", "$ln"], store)).to.eql(1)
    expect(store).to.eql({ n: 1, o: { n: 1 }, ln: "n" })
  })
})

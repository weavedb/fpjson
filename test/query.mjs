import fpjson from "../src/index.mjs"
import { _funcs, fgroups, _funcs_extra } from "./funcs.mjs"

import {
  prepend,
  unnest,
  assoc,
  mergeRight,
  of,
  toUpper,
  isEmpty,
  assocPath,
  path,
  forEach,
  tap,
  replace,
  includes,
  join,
  equals,
  allPass,
  complement,
  slice,
  take,
  remove,
  insertAll,
  both,
  propEq,
  split,
  findLastIndex,
  tail,
  isNil,
  o,
  compose,
  is,
  map,
  range,
  applySpec,
  prop,
  identity,
  fromPairs,
  init,
  dropLast,
  mergeLeft,
  groupBy,
  values,
  mapObjIndexed,
  modify,
  modifyPath,
  ifElse,
} from "ramda"

const regFn = [/^\((.+)\)$/, "$1"]
const replaceFn = o(replace(...regFn), prop(0))

let funcs = compose(
  mergeLeft(_funcs_extra),
  fromPairs,
  map(applySpec([replaceFn, identity]))
)(_funcs)

funcs = compose(
  map(
    map(
      o(
        ifElse(
          o(is(Array), prop(0)),
          modifyPath([0, 0], o(prop(0), split("#"))),
          modify(0, o(prop(0), split("#")))
        ),
        prop(1)
      )
    )
  ),
  groupBy(v => v[0].split("#")[0]),
  values,
  mapObjIndexed((v, k) => [k, v])
)(funcs)

fgroups.all = map(replaceFn)(_funcs)

export { funcs, fgroups }

const nil = v => isNil(v) || v === "*"

export const rand = v => v[Math.floor(Math.random() * v.length)]

export const getElm = (v, ids = {}, tags = { tags: [] }) => {
  if (allPass([complement(isNil), complement(is)(String), is(Array)])(v)) {
    const g = get(v)
    let i = 0
    tags.tags = g.tags
    return g.f
  }
  if (isNil(v) || !is(String)(v)) {
    tags.tags = null
    return v
  }
  const [elms, id, cond, vars] = v.split("#")
  if (!isNil(vars)) {
    ids = compose(
      mergeRight(ids),
      fromPairs,
      map(v2 => {
        const sp = split("=")(v2)
        if (sp[2] === "n") {
          sp[1] *= 1
        }
        return take(2, sp)
      }),
      split(",")
    )(vars)
  }
  const [elm, ...opt] = elms.split("-")
  let _elm = null
  let str = "abcdejfhijklmnopqrstuvwxyz".slice(0, 5).split("")
  if (!includes(elm)(["fn", "fg", "[fg]"])) {
    tags.tags = v
  }
  switch (elm) {
    case "r": {
      const from = nil(opt[0]) ? 0 : opt[0] * 1
      const to = nil(opt[1]) ? 10 : opt[1] * 1
      _elm = ["reg", rand(str.slice(from, to))]
      break
    }

    case "[o]": {
      const n = nil(opt[0]) ? 3 : opt[0] * 1
      tags.tags = []
      _elm = map(() => {
        let _tags = { tags: [] }
        const _e = getElm(`o`, {}, _tags)
        tags.tags.push(_tags.tags)
        return _e
      })(range(0, n))
      break
    }

    case "o": {
      const n = nil(opt[0]) ? 3 : opt[0] * 1
      let type = nil(opt[1]) ? "n" : opt[1]
      let fn = nil(opt[2]) ? "all" : opt[2]
      let n2 = nil(opt[3]) ? 1 : opt[3] * 1
      if (includes(type)(["fn", "fg"])) type += `-${fn}-${n2}`
      _elm = compose(
        fromPairs,
        map(() => [getElm("c"), getElm(type)])
      )(range(0, n))
      break
    }

    case "t": {
      _elm = ["typ", getElm("ts")]
      break
    }
    case "ts": {
      _elm = rand(["Boolean", "Number", "String", "Array", "Object"])
      break
    }
    case "*": {
      const elms = nil(opt[0])
        ? [getElm("s"), getElm("n"), getElm("[n]"), getElm("o"), getElm("b")]
        : map(getElm)(opt[0].split(","))
      _elm = rand(elms)
      break
    }

    case "m": {
      _elm = rand([null, getElm("n")])
      break
    }

    case "c": {
      const from = nil(opt[0]) ? 0 : opt[0] * 1
      const to = nil(opt[1]) ? 10 : opt[1] * 1
      const up = (nil(opt[2]) ? rand([1, 0]) : opt[2] * 1) !== 0
      _elm = rand(str.slice(from, to))
      if (up) _elm = toUpper(_elm)
      break
    }

    case "[c]": {
      const n = nil(opt[0]) ? 3 : opt[0] * 1
      const from = nil(opt[1]) ? 0 : opt[1] * 1
      const to = nil(opt[2]) ? 9 : opt[2] * 1
      _elm = map(() => getElm("c-" + from + "-" + to))(range(0, n))
      break
    }

    case "[[c]]": {
      const n = nil(opt[0]) ? 3 : opt[0] * 1
      const n2 = nil(opt[1]) ? 3 : opt[1] * 1
      const from = nil(opt[2]) ? 0 : opt[2] * 1
      const to = nil(opt[3]) ? 9 : opt[3] * 1
      _elm = map(() => getElm(`[c]-${n2}-${from}-${to}`))(range(0, n))
      break
    }

    case "s": {
      const n = nil(opt[0]) ? 5 : opt[0] * 1
      const from = nil(opt[1]) ? 0 : opt[1] * 1
      const to = nil(opt[2]) ? 9 : opt[2] * 1
      const before = nil(opt[3])
        ? ""
        : /^\$m/.test(opt[3])
        ? rand(["", opt[3].replace(/^\$m(.*)$/, "$1")])
        : opt[3]
      const after = nil(opt[4])
        ? ""
        : /^\$m/.test(opt[4])
        ? rand(["", opt[4].replace(/^\$m(.*)$/, "$1")])
        : opt[4]
      _elm = before + getElm(`[c]-${n}-${from}-${to}`).join("") + after
      break
    }

    case "[s]": {
      const n = nil(opt[0]) ? 3 : opt[0] * 1
      const n2 = nil(opt[1]) ? 3 : opt[1] * 1
      const from = nil(opt[2]) ? 0 : opt[2] * 1
      const to = nil(opt[3]) ? 9 : opt[3] * 1
      _elm = map(() => getElm(`[s]-${n2}-${from}-${to}`))(range(0, n))
      break
    }

    case "fg": {
      const group = rand(opt[0].split(","))
      const func = rand(fgroups[group])
      let _tags = { tags: [] }
      _elm = getElm(["fn", [func, ...tail(opt)].join("-")].join("-"), {}, _tags)
      _tags.tags[0] = v
      tags.tags = _tags.tags
      break
    }

    case "fn": {
      const _func = opt[0].split(",")
      const func = rand(_func)
      const arg = nil(opt[1]) ? 1 : opt[1] * 1
      const index = nil(opt[2]) ? -1 : opt[2] * 1
      _elm = compose(
        prop("f"),
        tap(g => {
          if (is(Array)(g.tags[0])) {
            g.tags[0][0] = v
          } else {
            g.tags[0] = v
          }
          tags.tags = g.tags
        }),
        get,
        dropLast(arg),
        init
      )(index === -1 ? rand(funcs[func]) : funcs[func][index])
      break
    }
    case "[fg]": {
      const func = opt[0]
      const n = nil(opt[2]) ? 3 : opt[2] * 1
      tags.tags.push("[]")
      _elm = compose(
        prepend("[]"),
        map(v => {
          let _tags = { tags: [] }
          const fname = "fg-" + opt.join("-")
          let _e = getElm(fname, {}, _tags)
          tags.tags.push(_tags.tags)
          return _e
        })
      )(range(0, n))
      break
    }

    case "b": {
      _elm = [true, false][Math.floor(Math.random() * 2)]
      break
    }

    case "n": {
      const from = nil(opt[0])
        ? 0
        : /^n[0-9]+$/.test(opt[0])
        ? opt[0].replace(/^n([0-9]+)$/, "$1") * -1
        : opt[0] * 1
      const to = nil(opt[1]) ? 9 : opt[1] * 1
      const x = nil(opt[2]) ? [] : opt[2].split(",")
      let l = 0
      let temp = null
      if (!isNil(cond)) {
        if (cond) {
          let j = JSON.parse(cond)
          let ok = false
          while (!ok && l < 1000) {
            _elm = null
            while (isNil(_elm)) {
              const __e = Math.floor(Math.random() * to) + from
              if (isEmpty(x) || !includes(__e)(x)) _elm = __e
              l++
              if (l === 1000) console.log("infinite loop")
            }
            const query = map(v => {
              if (is(String, v) && v[0] === "$") {
                if (tail(v) === id) {
                  return _elm
                } else {
                  return ids[tail(v)]
                }
              }
              return v
            })(j)
            ok = fpjson(query)
            temp = _elm
          }
        }
      } else {
        _elm = null
        while (isNil(_elm) && l < 1000) {
          const __e = Math.floor(Math.random() * to) + from
          if (isEmpty(x) || !includes(__e)(x)) _elm = __e
          l++
          if (l === 1000) console.log("infinite loop")
        }
      }
      break
    }
    case "n[n]": {
      const from = nil(opt[1]) ? 0 : opt[1]
      const to = nil(opt[2]) ? 9 : opt[2]
      _elm = getElm("n-" + from + "-" + to)
      if (rand([true, false])) _elm = of(_elm)
      break
    }
    case "[n]": {
      const n = isNil(opt[0])
        ? 3
        : opt[0] === "+"
        ? rand([true, false])
          ? 0
          : Math.floor(Math.random() * 3)
        : opt[0] === "*"
        ? Math.floor(Math.random() * 10)
        : opt[0] * 1
      const from = nil(opt[1]) ? 0 : opt[1]
      const to = nil(opt[2]) ? 9 : opt[2]
      _elm = map(() => getElm("n-" + from + "-" + to))(range(0, n))
      break
    }

    case "[[n]]": {
      const n = nil(opt[0]) ? 3 : opt[0] * 1
      const n2 = nil(opt[1]) ? 3 : opt[1]
      const from = nil(opt[2]) ? 0 : opt[2]
      const to = nil(opt[3]) ? 9 : opt[3]
      tags.tags = []
      _elm = map(() => {
        let _tags = { tags: [] }
        const _e = getElm(`[n]-${n2}-${from}-${to}`, {}, _tags)
        tags.tags.push(_tags.tags)
        return _e
      })(range(0, n))
      break
    }

    default:
      _elm = is(String)(v) ? v.replace(...regFn) : v
  }
  if (!isNil(id)) ids[id] = _elm
  return _elm
}

const wrapper = arr2 => {
  let root = true
  const wrap = arr2 => {
    const ind = findLastIndex(both(is(String), o(propEq(0, "w"), split("-"))))(
      arr2
    )
    if (ind !== -1) {
      const sp = arr2[ind].split("-")
      const n = isNil(sp[2]) ? 1 : sp[2] * 1
      let wrapped = [[sp[1], tail(slice(ind, ind + n + 1, arr2))]]

      if (
        !isNil(wrapped[0][1]) &&
        is(Array)(wrapped[0][1]) &&
        wrapped[0][1].length === 1 &&
        is(Array)(wrapped[0][1][0])
      ) {
        wrapped[0][1] = wrapped[0][1][0]
      }
      const _arr = compose(insertAll(ind, wrapped), remove(ind, n + 1))(arr2)
      return {
        _wrap: true,
        _arr,
      }
    } else {
      return { _wrap: false, _arr: arr2 }
    }
  }
  let _wrap = true
  let _arr = arr2
  while (_wrap) {
    ;({ _wrap, _arr } = wrap(_arr))
    root = false
  }

  _arr = map(v => {
    return !isNil(v) &&
      is(Array)(v) &&
      v.length === 1 &&
      is(Array)(v[0]) &&
      is(Array)(v[0][1]) &&
      is(String)(v[0][0])
      ? v[0]
      : v
  })(_arr)
  return _arr
}

const currify = arr2 => {
  const wrap = arr2 => {
    const ind = findLastIndex(both(is(String), equals("|")))(arr2)
    if (ind !== -1) {
      let wrapped = [...slice(0, ind, arr2)]
      const _arr = [wrapped, ...slice(ind + 1, arr2.length)(arr2)]
      return {
        _wrap: true,
        _arr,
      }
    } else {
      return { _wrap: false, _arr: arr2 }
    }
  }
  let _wrap = true
  let _arr = arr2
  while (_wrap) {
    ;({ _wrap, _arr } = wrap(_arr))
  }
  return _arr
}

export const get = arr => {
  let tags = []
  let ids = {}
  let arr2 = []
  if (is(Array)(arr)) {
    arr2 = map(v => {
      let _tags = { tags: [] }
      let g = getElm(v, ids, _tags)
      tags.push(_tags.tags)
      return g
    })(arr)
  } else {
    arr2 = map(v => {
      let _tags = { tags: [] }
      let g = getElm(v, ids, _tags)
      tags.push(_tags.tags)
      return g
    })([arr + "-0"])[0]
    tags = tags[0]
  }
  const _arr = compose(currify, wrapper)(arr2)
  return { f: _arr, tags: compose(currify, wrapper)(tags) }
}

export const makeQuestion = (o, p = [0]) => {
  const a = path(p, o)
  const q = assocPath(p, "???", o)
  const v = fpjson(o)
  return { p, a, q, v, o }
}

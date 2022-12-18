import * as R from "ramda"

const types = {
  Object,
  Array,
  String,
  Number,
  Boolean,
}

const isFunction = f => typeof f === "function"

const fn = (r, d = {}) => {
  if (R.isNil(r)) return r

  const _$ = R.curry(path => {
    if (/^\$/.test(path)) path = _var(R.tail(path), true)
    return R.path(path.split("."))(d)
  })

  const _var = R.curry((path, ignore) => _$(path))

  const _let = R.curry((path, val) => {
    let tar = d
    if (/^\$/.test(path)) path = _var(R.tail(path), true)
    let _path = path.split(".")
    for (let v of R.init(_path)) {
      if (R.isNil(tar[v])) tar[v] = {}
      tar = tar[v]
    }
    tar[R.last(_path)] = val
    return val
  })

  let ret = null
  if (isFunction(r[0])) {
    const args = R.tail(r)
    ret = r[0](...args)
  } else if (R.is(Array)(r) && r.length === 1 && r[0] === "__") {
    ret = R.__
  } else if (r[0] === "typ") {
    ret = types[r[1]]
  } else if (r[0] === "reg") {
    ret = new RegExp(...R.tail(r))
  } else if (
    R.is(Array)(r) &&
    (R.includes(r[0])(["let", "var", "$"]) || isFunction(R[r[0]]))
  ) {
    ret = R.compose(
      R.ifElse(
        R.o(R.gt(R.__, 0), R.length),
        R.apply(
          r[0] === "$"
            ? _$
            : r[0] === "var"
            ? _var
            : r[0] === "let"
            ? _let
            : R[r[0]]
        ),
        R.always(R[r[0]])
      ),
      R.map(v => fn(v, d)),
      R.tail
    )(r)
    ret = typeof ret === "undefined" ? [] : ret
  } else if (R.is(Object)(r) && R.is(String)(r.var)) {
    ret = R.path(r.var.split("."))(d)
  } else if (R.is(Array)(r) || R.is(Object)(r)) {
    ret = R.map(v => fn(v, d))(r)
  } else {
    ret = r
  }

  let _ret = null
  if (R.is(Array)(ret) && R.is(String)(ret[0]) && ret[0] === "[]") {
    _ret = R.tail(ret)
  } else {
    _ret = isFunction(ret[0]) ? fn(ret, d) : ret
  }

  return _ret
}

export default fn

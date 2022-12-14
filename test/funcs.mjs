import { split, map, modify } from "ramda"

export const _funcs = [
  ["add", "n-n5", "n-n5", "n"],
  ["multiply", "n-n5", "n-n5", "n"],
  ["subtract", "n-n5", "n-n5", "n"],
  ["divide", "n-n5-9-0", "n-n5-9-0", "n"],
  ["modulo", "n-n5", "n-n5-9-0", "n"],
  ["mathMod", "n-n5", "n-n5-9-0", "n"],
  ["mean", "[n]-3-n5", "n"],
  ["median", "[n]-3-n5", "n"],
  ["sum", "[n]-3-n5", "n"],
  ["product", "[n]-3-n5", "n"],
  ["inc", "n-n5", "n"],
  ["dec", "n-n5", "n"],
  ["negate", "n-n5", "n"],
  ["and", "b", "b", "b"],
  ["or", "b", "b", "b"],
  ["xor", "b", "b", "b"],
  ["not", "b", "b"],
  ["not#2", "fg-logic-0", "b"],
  ["equals", "n-n5", "n-n5", "b"],
  ["gt", "n-n5", "n-n5", "b"],
  ["lt", "n-n5", "n-n5", "b"],
  ["gte", "n-n5", "n-n5", "b"],
  ["lte", "n-n5", "n-n5", "b"],
  ["both", "fg-comp", "fg-comp", "|", "n-n5", "b"],
  ["either", "fg-comp", "fg-comp", "|", "n-n5", "b"],
  ["allPass", "[fg]-comp", "|", "n-n5", "b"],
  ["anyPass", "[fg]-comp", "|", "n-n5", "b"],
  ["clamp", "n-0-5#n1", `n#n2#["gt","$n2","$n1"]`, "n-n5", "n"],
  ["countBy", "fg-arg1", "[n]", "o"],
  ["difference", "[n]", "[n]", "[n]"],
  ["intersection", "[n]", "[n]", "[n]"],
  ["union", "[n]", "[n]", "[n]"],
  ["symmetricDifference", "[n]", "[n]", "[n]"],
  ["differenceWith", ["eqBy", "fg-arg1"], "[n]-3-n5", "[n]-3-n5", "[n]"],
  ["unionWith", ["eqBy", "fg-arg1"], "[n]-3-n5", "[n]-3-n5", "[n]"],
  [
    "symmetricDifferenceWith",
    ["eqBy", "fg-arg1"],
    "[n]-3-n5",
    "[n]-3-n5",
    "[n]",
  ],
  ["eqBy", "fg-arg1", "n-n5", "n-n5", "b"],
  ["identical", "[n]-1-0-3", "[n]-1-0-3", "b"],
  ["identical#2", "n-0-3", "n-0-3", "b"],
  ["max", "n-n5", "n-n5", "n"],
  ["min", "n-n5", "n-n5", "n"],
  ["maxBy", "fg-arg1,math", "n-n5", "n-n5", "n"],
  ["minBy", "fg-arg1,math", "n-n5", "n-n5", "n"],
  ["pathEq", "[n]-2-*-2", "n", "[[n]]", "b"],
  ["propEq", "c", "n", "o", "b"],
  ["sortBy", "fg-arg1", "[n]-5-n5", "[n]"],
  ["innerJoin", "w-flip", "fn-propEq-2", "[[n]]", "[n]", "[[n]]"],
  [
    "sortWith",
    ["[]", "fg-sort_order-0", "fg-sort_order-0"],
    "|",
    "[[n]]",
    "[[n]]",
  ],
  ["when", "fg-comp", "fg-arg1", "n-n5", "n"],
  ["ifElse", "fg-comp", "fg-arg1", "fg-arg1", "|", "n-n5", "n"],
  ["unless", "fg-comp", "fg-arg1", "n-n5", "n"],
  ["until", "fn-gt,gte", "fn-dec", "n-1", "n"],
  ["until#2", "fn-lt,lte", "fn-inc", "n-1", "n"],
  ["prop", "n-*-3", "[n]", "*"],
  ["propSatisfies", "fg-comp", "c", "o", "b"],
  ["pathSatisfies", "fg-comp", "[c]-2", "o-3-o", "b"],
  ["isEmpty", "[n]-+", "b"],
  ["defaultTo", "n", "|", "m", "n"],
  [
    "cond",
    [
      ["[]", "fg-comp", "fg-math"],
      ["[]", "fg-comp", "fg-math"],
      ["[]", "fn-T", "fg-math"],
    ],
    "|",
    "n-n5",
    "n",
  ],
  ["adjust", "n-0-3", "fg-arg1", "[n]", "[n]"],
  ["all", "fg-comp", "[n]-3-n5", "b"],
  ["any", "fg-comp", "[n]-3-n5", "b"],
  ["aperture", "n-1-5", "[n]-5", "[[n]]"],
  ["append", "n", "[n]", "[n]"],
  ["head", "[n]", "n"],
  ["chain", "fn-append-2", "fn-head", "|", "[n]", "[n]"],
  ["collectBy", "fg-comp", "[n]-5-n5", "[n]"],
  ["concat", "[n]", "[n]", "[n]"],
  ["count", "fg-comp", "[n]-5-n5", "n"],
  ["drop", "n-1-4", "[n]-5", "[n]"],
  ["dropLast", "n-1-4", "[n]-5", "[n]"],
  ["dropLastWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["dropRepeats", "[n]-9-n5", "[n]"],
  ["dropRepeatsWith", "fg-comp", "[n]-9-n5", "[n]"],
  ["dropWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["endsWith", "[n]-2-0-3", "[n]-5-0-3", "b"],
  ["startsWith", "[n]-2-0-3", "[n]-5-0-3", "b"],
  ["filter", "fg-comp", "[n]", "[n]"],
  ["find", "fg-comp", "[n]-5-n5", "n"],
  ["findIndex", "fg-comp", "[n]-5-n5", "n"],
  ["findLast", "fg-comp", "[n]-5-n5", "n"],
  ["findLastIndex", "fg-comp", "[n]-5-n5", "n"],
  ["flatten", "[[n]]", "[n]"],
  ["forEach", "fg-arg1", "[n]", "[n]"],
  ["fromPairs", "[[n]]-3-2", "o"],
  ["groupBy", "fn-prop", "[o]", "o"],
  ["groupWith", "fg-comp", "[n]-9", "[[n]]"],
  ["includes", "n", "[n]-5", "b"],
  ["indexBy", "fn-prop", "[o]", "o"],
  ["indexOf", "n", "[n]-5", "n"],
  ["init", "[n]", "[n]"],
  ["insert", "n-0-3", "n", "[n]", "[n]"],
  ["insertAll", "n-0-3", "[n]", "[n]", "[n]"],
  ["intersperse", "n", "[n]", "[n]"],
  ["into", "[]", "fn-drop", "[n]", "[n]"],
  ["join", "c", "[c]", "s"],
  ["last", "[n]", "n"],
  ["lastIndexOf", "n", "[n]-5", "n"],
  ["length", "[n]-*", "n"],
  ["map", "fg-arg1", "[n]", "[n]"],
  ["mapAccum", ["compose", ["repeat", ["__"], 2], "fg-math"], "n", "[n]", "*"],
  [
    "mapAccumRight",
    ["compose", ["repeat", ["__"], 2], "fg-math"],
    "n",
    "[n]",
    "*",
  ],
  ["mergeAll", "[o]", "o"],
  ["move", "n-0-3", "n-0-3", "[n]", "[n]"],
  ["none", "fg-comp", "[n]-3-n5", "b"],
  ["nth", "n-0-3", "[n]-5", "n"],
  ["pair", "n", "n", "[n]"],
  ["partition", "fg-comp", "[n]-5-n5", "[[n]]"],
  ["match", "r", "s", "o"],
  ["replace", "r", "s", "s", "o"],
  ["split", "r", "s", "[s]"],
  ["test", "r", "s", "b"],
  ["toLower", "s", "s"],
  ["toUpper", "s", "s"],
  ["toString", ["fg-math-0", "fg-math-0"], "s"],
  ["trim", "s-3-0-5-$m -$m ", "s"],
  ["pluck", "c", "[o]", "[n]"],
  ["prepend", "n", "[n]", "[n]"],
  ["range", "n-0-5#n1", `n#n2#["gt","$n2","$n1"]`, "[n]"],
  ["reduce", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["reduceBy", "fn-add,subtract,multiply", "n", "fg-comp", "[n]-3-n5", "*"],

  // reduced, sequence, transduce, traverse
  ["reduceRight", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["reduceWhile", "fg-comp", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["reject", "fg-comp", "[n]", "[n]"],
  ["remove", "n-0-3", "n-0-3", "[n]-5", "[n]-5"],
  ["repeat", "n", "n", "[n]"],
  ["reverse", "[n]", "[n]"],
  ["scan", "fn-add,subtract,multiply-2", "n", "[n]", "*"],
  ["slice", "n-0-5", "n-6-5", "[n]-9", "[n]"],
  ["sort", "fn-subtract-2", "[n]-9", "[n]"],
  ["splitAt", "n", "[n]-9", "[[n]]"],
  ["splitEvery", "n-1", "[n]-9", "[[n]]"],
  ["splitWhen", "fg-comp", "[n]-9-n5", "[[n]]"],
  ["splitWhenever", "fg-comp", "[n]-9-n5", "[[n]]"],
  ["tail", "[n]", "[n]"],
  ["take", "n-0-5", "[n]-5", "[n]"],
  ["takeLast", "n-0-5", "[n]-5", "[n]"],
  ["takeLastWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["takeWhile", "fg-comp", "[n]-5-n5", "[n]"],
  ["times", "fg-math", "n", "[n]"],
  ["transpose", "[[n]]-3-2", "[[n]]"],
  [
    "unfold",
    [
      "ifElse",
      ["gt", "n-5-5"],
      ["applySpec", ["[]", ["identity"], ["inc"]]],
      ["always", false],
    ],
    "n-0-5",
    "[n]",
  ],
  [
    "unfold#2",
    [
      "ifElse",
      ["lt", "n-0-5"],
      ["applySpec", ["[]", ["identity"], ["dec"]]],
      ["always", false],
    ],
    "n-5-5",
    "[n]",
  ],
  ["uniq", "[n]-9-n5", "[n]"],
  ["uniqBy", "fg-arg1", "[n]-9-n5", "[n]"],
  ["uniqWith", ["eqBy", "fg-arg1"], "[n]-9-n5", "[n]"],
  ["unnest", ["[[n]]-2", "[n]"], "[n]"],
  ["update", "n-0-3", "n", "[n]", "[n]"],
  ["without", "[n]", "[n]-9", "[n]"],
  ["xprod", "[n]", "[n]", "[[n]]"],
  ["zip", "[n]", "[n]", "[[n]]"],
  ["zipObj", "[n]", "[n]", "[[n]]"],
  ["zipWith", "fg-math-2", "[n]", "[n]", "[[n]]"],
  ["assoc", "c", "n", "o", "o"],
  ["assocPath", "[c]-2", "n", "o-3-o", "{o}"],
  ["clone", "o", "o"],
  ["dissoc", "c", "o", "o"],
  ["dissocPath", "[c]-2", "o-3-o", "{o}"],
  ["eqProps", "c", "o", "o", "b"],
  ["evolve", "o-1-fg-arg1", "o", "o"],
  ["forEachObjIndexed", "fg-arg1", "o", "o"],
  ["has", "c", "o", "b"],
  ["hasIn", "c", "o", "b"],
  ["hasPath", "[c]-2", "o-2-o", "b"],
  ["invert", "o", "o"],
  ["invertObj", "o", "o"],
  ["keys", "o", "[c]"],
  ["keysIn", "o", "[c]"],

  //lens, lensIndex, lensPath, lensProp, over, set, view
  ["mapObjIndexed", "fg-arg1", "o", "o"],
  ["mergeDeepLeft", "o-3-o", "o-3-o", "{o}"],
  ["mergeDeepRight", "o-3-o", "o-3-o", "{o}"],
  ["mergeDeepWith", "fg-math-2", "o-3-o", "o-3-o", "{o}"],
  [
    "mergeDeepWithKey",
    ["compose", ["apply", "fg-math-2"], ["unapply", ["drop", 1]]],
    "o-3-o",
    "o-3-o",
    "o",
  ],
  ["mergeLeft", "o", "o", "o"],
  ["mergeRight", "o", "o", "o"],
  ["mergeWith", "fg-math-2", "o", "o", "o"],
  [
    "mergeWithKey",
    ["compose", ["apply", "fg-math-2"], ["unapply", ["drop", 1]]],
    "o",
    "o",
    "o",
  ],
  ["modify", "c", "fg-arg1", "o", "o"],
  ["modifyPath", "[c]-2", "fg-arg1", "o-3-o", "{o}"],
  ["objOf", "s", "n", "o"],
  ["omit", "[c]", "o", "o"],
  ["path", "[c]-2", "o-3-o", "n"],
  ["pathOr", "n", "[c]-2", "o-3-o", "n"],
  ["paths", "[[c]]-3-2", "o-3-o", "[n]"],
  ["pick", "[c]", "o", "o"],
  ["pickAll", "[c]", "o", "o"],
  ["pickBy", "fg-comp", "o", "o"],
  ["project", "[c]", "[o]", "[o]"],
  ["prop", "c", "o", "n"],
  ["propOr", "n", "c", "o", "n"],
  ["props", "[c]", "o", "[n]"],
  ["toPairs", "o", "[[n]]"],
  ["toPairsIn", "o", "[[n]]"],
  ["unwind", "c", "o-3-[n]", "[o]"],
  ["values", "o", "[n]"],
  ["valuesIn", "o", "[n]"],
  ["where", "o-1-fg-comp-1", "o", "b"],
  ["whereAny", "o-1-fg-comp-1", "o", "b"],
  ["whereEq", "o-2", "o-5", "b"],

  // andThen, binary, bind, comparator,composeWith,construct,constructN
  // curry, curryN, invoker, memoizeWith, nAry,nthArg,otherwise,partialObject,pipeWith,tap,tryCatch,trunkify,unary,uncurryN
  ["always", "n", "|", "*", "n"],
  ["ap", ["[]", "fg-arg1", "fg-arg1"], "[n]", "[n]"],
  ["apply", "fg-math-2", "[n]-2", "n"],
  ["applySpec", "o-3-fg-arg1", "|", "n", "o"],
  ["applyTo", "n", "fg-arg1", "n"],
  ["ascend", ["prop", "n-0-3"], "f"],
  ["descend", ["prop", "n-0-3"], "f"],
  ["call", "fg-math", "n", "n", "n"],
  ["compose", "fg-math", "fg-math", "|", "n", "n"],
  ["converge", "fg-math-2", ["[]", "fg-arg1", "fg-arg1"], "|", "n", "n"],
  ["empty", "*-[n],o,s", "[n]"],
  ["F", "*", "b"],
  ["identity", "*", "*"],
  ["juxt", ["[]", "fg-math-2", "fg-math-2"], "|", "n", "n", "[n]"],
  ["lift", "fg-math-2", "|", "[n]", "[n]", "[n]"],
  ["liftN", 2, "fg-math-2", "|", "[n]", "[n]", "[n]"],
  ["nthArg", "n-0-3", "|", "n", "n", "n", "n"],
  ["(o)", "fg-arg1", "fg-arg1", "|", "n", "n"],
  ["of", "n", "[n]"],
  ["on", "fg-math-2", "fg-arg1", "n", "n", "n"],
  ["once", "fg-arg1", "|", "n", "n"],
  ["partial", "fg-math-2", "[n]-1", "|", "n", "n"],
  ["partialRight", "fg-math-2", "[n]-1", "|", "n", "n"],
  ["pipe", "fg-math", "fg-math", "|", "n", "n"],
  ["promap", "fg-arg1", "fg-arg1", "fg-arg1", "|", "n", "n"],
  ["T", "*", "b"],
  ["unapply", "fg-math_arr", "|", "n", "n", "n"],
  ["useWith", "fg-math-2", ["[]", "fg-arg1", "fg-arg1"], "|", "n", "n", "n"],

  ["isNil", "m", "b"],
  ["is", "t", "[n]", "b"],
  ["propIs", "t", "c", "o", "b"],
  ["type", "*", "s"],
]

export const fgroups = {
  sort_order: ["ascend", "descend"],
  math: ["add", "subtract", "multiply", "divide", "modulo"],
  math_arr: ["sum", "product", "mean", "median"],
  arg1: ["inc", "dec", "negate"],
  comp: ["gt", "lt", "gte", "lte", "equals"],
  maps: ["map"],
  logic: ["and", "or", "xor"],
  gl: ["gt", "lt"],
}

export const _funcs_extra = {
  complement: ["w-complement", "fg-comp-2", "n", "n", "b"],
  addIndex: ["w-addIndex", "fn-map-2", "fg-math-2", "[n]", "[n]"],
  flip: ["w-flip", "fg-math-2", "n", "n", "n"],
  __: [["fg-math-2", ["__"], "n"], "n", "n"],
}

export const _cat = {
  Type: "is,isNil,propIs,type",
  Function:
    "__,addIndex,always,andThen,ap,apply,applySpec,applyTo,ascend,binary,bind,call,comparator,compose,composeWith,construct,constructN,converge,curry,curryN,descend,empty,F,flip,identity,invoker,juxt,lift,liftN,memoizeWith,nAry,nthArg,o,of,on,once,otherwise,partial,partialObject,partialRight,pipe,pipeWith,promap,T,tap,thunkify,tryCatch,unapply,unary,uncurryN,useWith",
  Math:
    "add,dec,divide,inc,mathMod,mean,median,modulo,multiply,negate,product,subtract,sum",
  List:
    "adjust,all,any,aperture,append,chain,collectBy,concat,count,drop,dropLast,dropLastWhile,dropRepeats,dropRepeatsWith,dropWhile,endsWith,filter,find,findIndex,findLast,findLastIndex,flatten,forEach,fromPairs,groupBy,groupWith,head,includes,indexBy,indexOf,init,insert,insertAll,intersperse,into,join,last,lastIndexOf,length,map,mapAccum,mapAccumRight,mergeAll,move,none,nth,pair,partition,pluck,prepend,range,reduce,reduceBy,reduced,reduceRight,reduceWhile,reject,remove,repeat,reverse,scan,sequence,slice,sort,splitAt,splitEvery,splitWhen,splitWhenever,startsWith,tail,take,takeLast,takeLastWhile,takeWhile,times,transduce,transpose,traverse,unfold,uniq,uniqBy,uniqWith,unnest,update,without,xprod,zip,zipObj,zipWith",
  Logic:
    "allPass,and,anyPass,both,complement,cond,defaultTo,either,ifElse,isEmpty,not,or,pathSatisfies,propSatisfies,unless,until,when,xor",
  Relation:
    "clamp,countBy,difference,differenceWith,eqBy,equals,gt,gte,identical,innerJoin,intersection,lt,lte,max,maxBy,min,minBy,pathEq,propEq,sortBy,sortWith,symmetricDifference,symmetricDifferenceWith,union,unionWith",
  Object:
    "assoc,assocPath,clone,dissoc,dissocPath,eqProps,evolve,forEachObjIndexed,has,hasIn,hasPath,invert,invertObj,keys,keysIn,lens,lensIndex,lensPath,lensProp,mapObjIndexed,mergeDeepLeft,mergeDeepRight,mergeDeepWith,mergeDeepWithKey,mergeLeft,mergeRight,mergeWith,mergeWithKey,modify,modifyPath,objOf,omit,over,path,pathOr,paths,pick,pickAll,pickBy,project,prop,propOr,props,set,toPairs,toPairsIn,unwind,values,valuesIn,view,where,whereAny,whereEq",
  String: "match,replace,split,test,toLower,toString,toUpper,trim",
}

export let tutorial = map(modify("funcs", split(",")))([
  {
    key: "math1",
    title: "Math A",
    funcs: "inc,dec,negate",
  },
  {
    key: "math2",
    title: "Math B",
    funcs: "add,subtract,multiply,divide,modulo,mathMod",
  },
  {
    key: "math3",
    title: "Math C",
    funcs: "sum,product,mean,median",
  },
  {
    key: "relation1",
    title: "Relation A",
    funcs: "equals,gt,gte,lt,lte",
  },
  {
    key: "relation2",
    title: "Relation B",
    funcs: "clamp,max,min,maxBy,minBy",
  },
  {
    key: "logic1",
    title: "Logic A",
    funcs: "and,or,xor,not",
  },
  {
    key: "logic2",
    title: "Logic B",
    funcs: "both,either,allPass,anyPass",
  },
  {
    key: "logic3",
    title: "Logic C",
    funcs: "all,any,none",
  },
  {
    key: "logic4",
    title: "Logic D",
    funcs: "defaultTo,when,unless,ifElse,cond,until",
  },
  {
    key: "string1",
    title: "String A",
    funcs: "toLower,toUpper,toString,trim",
  },
  {
    key: "string2",
    title: "String B",
    funcs: "test,match,replace,split,join",
  },
  {
    key: "type1",
    title: "Type A",
    funcs: "is,isNil,propIs,type",
  },
  {
    key: "list1",
    title: "List A",
    funcs: "head,last,init,tail,uniq,reverse,dropRepeats",
  },
  {
    key: "list2",
    title: "List B",
    funcs:
      "append,prepend,insert,insertAll,intersperse,concat,update,move,remove,without,take,takeLast,drop,dropLast,slice",
  },
  {
    key: "list3",
    title: "List C",
    funcs:
      "intersection,union,difference,symmetricDifference,unionWith,differenceWith,symmetricDifferenceWith",
  },
  {
    key: "list4",
    title: "List D",
    funcs: "of,pair,range,repeat,times,flatten,zipWith,pluck",
  },
  {
    key: "list5",
    title: "List E",
    funcs:
      "adjust,map,filter,reject,uniqBy,uniqWith,dropWhile,dropLastWhile,dropRepeatsWith,takeWhile,takeLastWhile,sort,sortBy,sortWith",
  },
  {
    key: "list6",
    title: "List F",
    funcs:
      "includes,startsWith,endsWith,findIndex,findLastIndex,indexOf,lastIndexOf,length,count,nth,find,findLast",
  },
  {
    key: "list7",
    title: "List G",
    funcs:
      "aperture,collectBy,groupWith,partition,splitAt,splitEvery,splitWhen,splitWhenever,transpose,unnest,xprod,zip,toPairs,innerJoin,lift,liftN",
  },
  {
    key: "list8",
    title: "List H",
    funcs: "scan,unfold,mapAccum,mapAccumRight,reduce,reduceRight,reduceWhile",
  },
  {
    key: "object1",
    title: "Object A",
    funcs:
      "identical,isEmpty,eqBy,has,hasPath,propEq,pathEq,eqProps,propSatisfies,pathSatisfies,whereEq,where,whereAny",
  },
  {
    key: "object2",
    title: "Object B",
    funcs:
      "prop,propOr,props,path,pathOr,paths,pick,pickAll,pickBy,project,keys,values",
  },
  {
    key: "object3",
    title: "Object C",
    funcs:
      "assoc,assocPath,dissoc,dissocPath,omit,modify,modifyPath,evolve,invert,invertObj,mapObjIndexed,unwind",
  },
  {
    key: "object4",
    title: "Object D",
    funcs:
      "mergeAll,mergeDeepLeft,mergeDeepRight,mergeDeepWith,mergeLeft,mergeRight,mergeWith",
  },
  {
    key: "object5",
    title: "Object E",
    funcs: "objOf,fromPairs,zipObj,groupBy,indexBy,countBy,reduceBy,applySpec",
  },
  {
    key: "function1",
    title: "Function A",
    funcs: "T,F,identity,always,empty",
  },
  {
    key: "function2",
    title: "Function B",
    funcs:
      "complement,addIndex,flip,once,apply,call,partial,partialRight,unapply",
  },
  {
    key: "function3",
    title: "Function C",
    funcs: "o,compose,pipe,promap,applyTo,converge,juxt,on,useWith,chain",
  },
])

import { expectTypeOf } from "expect-type";

type ComposeFunction = <F, G, H, Result>(
  f: (arg: F) => G,
  g: (arg: G) => H,
  h: (arg: H) => Result
) => (arg: F) => Result;

const compose: ComposeFunction = (f, g, h) => (a) => h(g(f(a)));

type FirstChar<T extends string> = T extends `${infer First}${string}`
  ? First
  : never;
const firstChar = <T extends string>(x: T) => x[0] as FirstChar<T>;
const upperCase = <T extends string>(x: T) => x.toUpperCase() as Uppercase<T>;
const lowerCase = <T extends string>(x: T) => x.toLowerCase() as Lowercase<T>;
const firstItem = <T extends Array<string>>(x: T): T[0] => x[0];
const makeTuple = <T extends string>(x: T): [T] => [x];
const makeBox = <T>(value: T) => ({ value });

// =====TEST=====

const t0 = compose(upperCase, makeTuple, makeBox)("hello!").value[0];
expectTypeOf(t0).toMatchTypeOf<"HELLO!">();

const t1 = compose(makeTuple, firstItem, makeBox)("hello!" as const).value;
expectTypeOf(t1).toMatchTypeOf<"hello!">();

const t2 = compose(upperCase, firstChar, lowerCase)("hello!");
expectTypeOf(t2).toMatchTypeOf<"h">();

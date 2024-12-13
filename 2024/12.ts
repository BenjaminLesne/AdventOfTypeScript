type ThreeStringsTuple = [string, string, string];

type LengthOfString<
  S extends string,
  T extends any[] = []
> = S extends `${infer _}${infer Rest}`
  ? LengthOfString<Rest, [...T, any]>
  : T["length"];

type GetRating<
  Index extends number,
  Rating extends "naughty" | "nice" = "nice",
  Accumulator extends number[] = [],
  Max extends number = 0
> = Index extends Max
  ? Rating extends "naughty" ? "nice" : "naughty"
  : GetRating<
      [Index, ...Accumulator]["length"],
      Rating extends "naughty" ? "nice" : "naughty",
      [Index, ...Accumulator],
      Max extends 0 ? Index : Max
    >

type ToObject<T extends ThreeStringsTuple> = {
  name: T[0];
  rating: GetRating<LengthOfString<T[0]>>;
  count: T[2] extends `${infer N extends number}` ? N : never;
};

type FormatNames<T extends ThreeStringsTuple[]> = {
  [K in keyof T]: ToObject<T[K]>;
};
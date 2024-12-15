type GetNextFuel<
  Destination extends string,
  Accumulator extends any[] = []
> = Destination extends `${infer Character}${infer Rest}`
  ? Character extends "-"
    ? GetNextFuel<Rest, [...Accumulator, any]>
    : GetNextFuel<Rest, Accumulator>
  : Accumulator["length"];

type GetDestinations<
  Route extends string,
  Destinations extends string[] = []
> = Route extends `${infer Character}${infer Rest}`
  ? Character extends "-"
    ? GetNextFuel<Rest, [...Destinations, any]>
    : GetNextFuel<Rest, Destinations>
  : [...Destinations, Route];

// type NotDash = Exclude<string, "-">;
type NotDash<T extends string> = T extends `${string}-${string}` ? never : T;

type GetNextDestination<T extends string> =
  T extends `${infer Destination}-${infer Rest}` ? [Destination, Rest] : [T, ""];

type Toto = GetNextDestination<"hawaii">

type GetNextFuelAmount<
  T extends string,
  Accumulator extends string[] = []
> = T extends `-${infer Rest}`
  ? GetNextFuelAmount<Rest, ["-", ...Accumulator]>
  : [Accumulator["length"], T];

type GetPartialRoute<
  T extends string,
  Accumulator extends any[] = [],
  Fuel extends GetNextFuelAmount<T> = GetNextFuelAmount<T>,
  Destination extends GetNextDestination<Fuel[1]> = GetNextDestination<Fuel[1]>,
  RestOfRoute extends string = Destination[1]
> = RestOfRoute extends ""
  ? Accumulator
  : GetPartialRoute<RestOfRoute, [...Accumulator, [Destination[0], Fuel[0]]]>;

// ==========

// type Test<T extends string> = T extends `${string}-${infer Destination extends NotDash}` ?  Destination : never;

// type GetNextDestination<T extends string> = T extends `${infer Destination}-${string}` ? Destination : never;

type GetSubRoute<T extends string> = GetNextDestination<T>;

// Example usage:
type Result = GetPartialRoute<"-----hawaii">; // "hawaii"
type Result2 =
  GetPartialRoute<"north_pole-----candycane_forest----gumdrop_sea-------hawaii">; // "hawaii"

type Test<T extends string> = T extends `-${infer Rest extends NotDash}-`
  ? Rest
  : never;

type Test1 =
  Test<"north_pole-----candycane_forest----gumdrop_sea-------hawaii">;
// type Test1 = Test<"north_pole--candycane_forest----gumdrop_sea-------hawaii">;

type Test2 = GetNextDestination<"north_pole-------hawaii">;

const myVar: Test1 = [
  "north_pole",
  "--candycane_forest",
  "----gumdrop_sea",
  "-------hawaii",
];

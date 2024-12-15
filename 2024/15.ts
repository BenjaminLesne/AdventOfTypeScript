type GetNextDestination<T extends string> =
  T extends `${infer Destination}-${infer Rest}`
    ? [Destination, `-${Rest}`]
    : [T, ""];

type GetNextFuelAmount<
  T extends string,
  Accumulator extends string[] = []
> = T extends `-${infer Rest}`
  ? GetNextFuelAmount<Rest, ["-", ...Accumulator]>
  : [Accumulator["length"], T];

type GetRoute<
  T extends string,
  Accumulator extends any[] = [],
  Fuel extends GetNextFuelAmount<T> = GetNextFuelAmount<T>,
  Destination extends GetNextDestination<Fuel[1]> = GetNextDestination<Fuel[1]>,
  RestOfRoute extends string = Destination[1]
> = RestOfRoute extends ""
  ? Destination[0] extends ""
    ? Accumulator
    : [...Accumulator, [Destination[0], Fuel[0]]]
  : GetRoute<
      RestOfRoute,
      Accumulator extends []
        ? [[Destination[0], 0]]
        : [...Accumulator, [Destination[0], Fuel[0]]]
    >;

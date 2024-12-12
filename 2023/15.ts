type BoxToys<
  ToyType extends string,
  AmountType extends number,
  WantedToys extends unknown[] = []
> = AmountType extends WantedToys["length"]
  ? WantedToys
  : BoxToys<ToyType, AmountType, [...WantedToys, ToyType]>;

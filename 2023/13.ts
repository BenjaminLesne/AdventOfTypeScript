type Sequence<
  TNumber extends number,
  Acc extends number[] = []
> = TNumber extends Acc["length"]
  ? Acc[number]
  : Sequence<TNumber, [...Acc, Acc["length"]]>;

type DayCounter<StartType extends number, EndType extends number> =
  | Exclude<Sequence<EndType>, Sequence<StartType>>
  | EndType;

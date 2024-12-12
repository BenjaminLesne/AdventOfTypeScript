type Toy = ToySack[number];
type Count<
  Bag extends unknown[],
  WantedToy extends Toy,
  Acc extends Toy[] = []
> = Bag extends [infer Head, ...infer Tail]
  ? Head extends WantedToy
    ? Count<Tail, WantedToy, [...Acc, Head]>
    : Count<Tail, WantedToy, Acc>
  : Bag["length"];

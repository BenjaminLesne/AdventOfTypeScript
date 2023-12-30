type ToyLogic = {
  "🛹": "🚲";
  "🚲": "🛴";
  "🛴": "🏄";
  "🏄": "🛹";
};

type Toys = keyof ToyLogic;

type MultiplyToy<
  Toy extends Toys,
  Factor extends number,
  Acc extends unknown[] = []
> = Acc["length"] extends Factor
  ? Acc
  : MultiplyToy<Toy, Factor, [...Acc, Toy]>;

type Rebuild<
  Quantities,
  Toy extends Toys = "🛹",
  Acc extends unknown[] = []
> = Quantities extends [infer Head extends number, ...infer Tail]
  ? Rebuild<Tail, ToyLogic[Toy], [...Acc, ...MultiplyToy<Toy, Head>]>
  : Acc;

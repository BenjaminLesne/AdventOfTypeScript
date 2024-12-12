type FindSanta<
  TupleType extends any[],
  IndexType extends any[] = []
> = TupleType extends [infer FirstType, ...infer RestType]
  ? FirstType extends "🎅🏼"
    ? IndexType["length"]
    : FindSanta<[...RestType], [0, ...IndexType]>
  : never;

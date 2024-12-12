type Santa = "🎅🏼";
type Tree = "🎄";
type Forest = (Santa | Tree)[];

type ParseInt<T extends unknown> =
  T extends `${infer UnknownType extends number}` ? UnknownType : never;

type FindNonNever<T extends any[]> = {
  [K in keyof T]: T[K] extends never ? never : T[K];
}[number];

type MySwapKeysAndValues<T extends Record<number, Santa | Tree>> = {
  [K in keyof T as `${T[K] & string}`]: `${K & string}`;
};

type MyColumnIndex<Row extends Forest> =
  Santa extends keyof MySwapKeysAndValues<Row>
    ? MySwapKeysAndValues<Row>[Santa]
    : never;

type FindSanta2<Area extends Forest[]> = FindNonNever<{
  [Key in keyof Area]: MyColumnIndex<Area[Key]> extends never
    ? never
    : [ParseInt<Key>, ParseInt<MyColumnIndex<Area[Key]>>];
}>;

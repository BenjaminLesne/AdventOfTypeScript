type SantaListProtector<T> = {
  readonly [P in keyof T]: T[P] extends Function
    ? T[P]
    : SantaListProtector<T[P]>;
};

type PerfReview<T extends AsyncGenerator> = T extends AsyncGenerator<
  infer R,
  any,
  any
>
  ? R
  : never;

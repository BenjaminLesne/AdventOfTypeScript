type Reverse<TString extends string> =
  TString extends `${infer TFirst}${infer TRest}`
    ? `${Reverse<TRest>}${TFirst}`
    : "";

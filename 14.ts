type DecipherNaughtyList<ListType extends string> =
  ListType extends `${infer StartType}/${infer RestType}`
    ? StartType | DecipherNaughtyList<RestType>
    : ListType;

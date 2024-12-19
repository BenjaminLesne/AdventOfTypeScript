type Whitespace = " " | "\t" | "\n" | "\r"

type TrimLeft<S extends string> = S extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : S;
type TrimRight<S extends string> = S extends `${infer Rest}${Whitespace}` ? TrimRight<Rest> : S;
type Trim<S extends string> = TrimLeft<TrimRight<S>>;

type SplitStatements<S extends string> = S extends `${infer First};${infer Rest}`
  ? [...ParseStatement<Trim<First>>, ...SplitStatements<Trim<Rest>>]
  : S extends `${infer Last}` 
    ? Last extends "" | `${Whitespace}${string}`
      ? []
      : [...ParseStatement<Trim<Last>>]
    : [];

type ParseStatement<S extends string> = 
  S extends `${("let" | "const" | "var")} ${infer VarName}${Whitespace}=${Whitespace}${string}`
    ? [{ id: Trim<VarName>; type: "VariableDeclaration" }]
    : S extends `${infer FuncName}(${infer Arg})`
      ? [{ argument: Trim<Arg>; type: "CallExpression" }]
      : [];

type Parse<S extends string> = SplitStatements<Trim<S>>;
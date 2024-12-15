type GetNextFuel<
	Destination extends string,
	Accumulator extends any[] = [],
> = Destination extends `${infer Character}${infer Rest}`
	? Character extends "-"
		? GetNextFuel<Rest, [...Accumulator, any]>
		: GetNextFuel<Rest, Accumulator>
	: Accumulator["length"];


type GetDestinations<
	Route extends string,
	Destinations extends string[] = [],
> = Route extends `${infer Character}${infer Rest}`
	? Character extends "-"
		? GetNextFuel<Rest, [...Destinations, any]>
		: GetNextFuel<Rest, Destinations>
	: [...Destinations, Route];

type NotDash = Exclude<string, "-">

type GetNextDestination<T extends string> = T extends `${infer Destination}-${infer Rest}` ? [Destination, Rest] : never;
	// ==========



// type Test<T extends string> = T extends `${string}-${infer Destination extends NotDash}` ?  Destination : never;

// type GetNextDestination<T extends string> = T extends `${infer Destination}-${string}` ? Destination : never;

type GetSubRoute<T extends string> = GetNextDestination<T>

type Test<T extends string> = T extends `-${infer Rest extends NotDash}-` ? Rest : never 


type Test1 = Test<"-----candycane_forest----gumdrop_sea-------hawaii">;
// type Test1 = Test<"north_pole--candycane_forest----gumdrop_sea-------hawaii">;

type Test2= GetNextDestination<Test1>

const myVar: Test1 = ["north_pole", "--candycane_forest", "----gumdrop_sea", "-------hawaii"]
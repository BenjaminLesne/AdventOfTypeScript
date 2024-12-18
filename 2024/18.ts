// type Fn<T extends Array<string> = []> = <Colors extends Array<string>, A = T extends [] ? Colors : T>(colors: A, defaultColor: A[number]) => A[number]
// type Fn = <
//   A extends string = "",
// 	Colors extends string[],
// 	Default extends Colors[number] = A extends "" ? Colors[number] : A,
// >(
// 	colors: Colors,
// 	defaultColor: Default,
// ) => Colors[number];

type Fn = <
	Color extends string = "",
	Colors extends readonly string[] = Color extends "" ? readonly string[] : readonly Color[],
	T = Colors[number],
>(
	colors: Colors,
	defaultColor: T,
) => T;

const createStreetLight: Fn = (colors, defaultColor) => {
	console.log(colors);
	return defaultColor;
};

const colors = ["red" as const, "yellow" as const, "green" as const];

const test = createStreetLight(colors, "blue");

// @ts-expect-error (no generic parameters) blue is not a valid option
const e0 = createStreetLight(colors, "blue");

// @ts-expect-error does not accept two generic parameters, even providing a valid option
const e1 = createStreetLight<Color, 'red'>(colors, "red");

// @ts-expect-error does not accept two generic parameters, and blue isn't a valid option
const e2 = createStreetLight<Color, 'blue'>(colors, "blue");

// @ts-expect-error (with one generic parameter) blue is not a valid option
const e3 = createStreetLight<Color>(colors, "blue");




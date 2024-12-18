import { expectTypeOf } from "expect-type";

type Fn = <Color extends string, Colors extends string[] = Color[]>(
  colors: Colors,
  defaultColor: Colors[number]
) => Colors[number];

const createStreetLight: Fn = (colors, defaultColor) => {
	console.log(colors);
	return defaultColor;
};

const colors = ["red" as const, "yellow" as const, "green" as const];
type Color = (typeof colors)[number];

// const test = createStreetLight(colors, "blue");

// @ts-expect-error (no generic parameters) blue is not a valid option
const e0 = createStreetLight(colors, "blue");

// @ts-expect-error does not accept two generic parameters, even providing a valid option
const e1 = createStreetLight<Color, "red">(colors, "red");

// @ts-expect-error does not accept two generic parameters, and blue isn't a valid option
const e2 = createStreetLight<Color, "blue">(colors, "blue");

// @ts-expect-error (with one generic parameter) blue is not a valid option
const e3 = createStreetLight<Color>(colors, "blue");

// red is a valid color, no generic parameters needed
const t0_const = createStreetLight(colors, "red");
expectTypeOf(t0_const).toMatchTypeOf<Color>();

// one generic parameter is ok
const t1_const = createStreetLight<Color>(colors, "red");
expectTypeOf(t1_const).toMatchTypeOf<Color>();

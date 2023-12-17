type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";
type Rock = "👊🏻";
type Paper = "🖐🏾";
type Scissor = "✌🏽";
type Win = "win";
type Lose = "lose";
type Draw = "draw";

type WhoWins<
  P1 extends RockPaperScissors,
  P2 extends RockPaperScissors
> = P1 extends P2
  ? Draw
  : P1 extends Rock
  ? P2 extends Paper
    ? Win
    : Lose
  : P1 extends Paper
  ? P2 extends Scissor
    ? Win
    : Lose
  : never;

type test = WhoWins<Rock, Scissor>;

type Logic = {
  "👊🏻": {
    "🖐🏾": Win;
    "✌🏽": Lose;
    "👊🏻": Lose;
  };
  "🖐🏾": {
    "✌🏽": Win;
    "👊🏻": Lose;
    "🖐🏾": Draw;
  };
  "✌🏽": {
    "👊🏻": Win;
    "🖐🏾": Lose;
    "✌🏽": Draw;
  };
};

type WhoWins2<
  P1 extends RockPaperScissors,
  P2 extends RockPaperScissors
> = Logic[P1][P2];

type test2 = WhoWins<Rock, Scissor>;

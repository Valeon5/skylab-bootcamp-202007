describe("diceGame", function () {
  let game;

  beforeEach(function () {
    game = new DiceGame();
  });

  it("should create", function () {
    expect(game).toBeTruthy();
  });

  it("should roll dices", function () {
    expect(game.play()).toBeDefined();
    expect(game.play().hasOwnProperty("firstDice")).toEqual(true);
    expect(game.play().hasOwnProperty("secondDice")).toEqual(true);
  });
});

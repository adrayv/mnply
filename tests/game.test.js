import { createGame } from "../game/game";

describe("Game Methods", () => {
  describe("createGame()", () => {
    const players = ["p4", "p1", "p3", "p2"];
    it("should return null if trying create a game with less than 2 players", () => {
      const game = createGame();
      expect(game).toBe(null);
    });
    it("should have the order of the game be the order of the players passed", () => {
      const game = createGame(players);
      expect(game.order).toBe(players);
    });
    it("should have the first player be the first player in the passed-in array", () => {
      const game = createGame(players);
      expect(game.turn).toBe("p4");
    });
    it("should have each player start with 5 cards, and the first player, 7 cards", () => {
      const game = createGame(players);
      players.forEach((player, i) => {
        expect(game.players[player].hand.length).toBe(i === 0 ? 7 : 5);
      });
    });
    it("should have the starting deck length be 106 - (N * 5) + 2, where N == num players", () => {
      let game = createGame(players);
      expect(game.deck.length).toBe(84);
      game = createGame(players.concat(["p5"]));
      expect(game.deck.length).toBe(79);
    });
  });
});

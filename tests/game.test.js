import {
  createGame,
  getAllFullSetIds,
  getAllSetIds,
  getCash,
  getHand,
  getPlayerIds,
  getPlayers,
  getSetById,
  getSetIds,
  getSetOwnerId,
  getSets,
  playerCanDealbreak,
  playerCanIssueCharge,
  playerHasColorOnBoard,
} from "../game/utils/game";
import { createSet } from "../game/utils/set";

describe("Game Methods", () => {
  describe("createGame()", () => {
    const players = ["p4", "p1", "p3", "p2"];
    it("should return null if trying create a game with less than 2 players", () => {
      const game = createGame();
      expect(game).toBe(null);
    });
    it("should return null if trying to create a game with more than 10 players", () => {
      const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const game = createGame(players);
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
  describe("getPlayers()", () => {
    it("should return players", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(Object.keys(getPlayers(game))).toEqual(players);
    });
  });
  describe("getPlayerIds()", () => {
    it("should return playerIds", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(getPlayerIds(game)).toEqual(players);
    });
  });
  describe("getHand()", () => {
    it("should return the hand of a player given a player id", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(getHand(game, "p1").length).toEqual(7);
    });
  });
  describe("getCash()", () => {
    it("should return the cash of a player given a player id", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      const cash = [
        "v1-a5907b43-58aa-491b-861b-4f5733f30615",
        "v1-5a5fca50-5253-48e9-9a3e-d9ef41dcd53e",
      ];
      game.players.p1.cash = cash;
      expect(getCash(game, "p1")).toEqual(cash);
    });
  });
  describe("getSets()", () => {
    it("should return the sets of a player given a player id", () => {
      const sets = [...new Array(3)]
        .map((e, i) => createSet([String(i)]))
        .reduce((s, curr) => {
          return {
            ...s,
            [curr.id]: curr,
          };
        }, {});
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = sets;
      expect(getSets(game, "p1")).toEqual(sets);
    });
  });
  describe("getSetOwnerId()", () => {
    it("should return the player id of the passed in set id", () => {
      const sets = [...new Array(3)]
        .map((e, i) => createSet([String(i)]))
        .reduce((s, curr) => {
          return {
            ...s,
            [curr.id]: curr,
          };
        }, {});
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = sets;
      expect(getSetOwnerId(game, Object.keys(sets)[0])).toBe("p1");
    });
    it("should return null if the set id doesnt exist", () => {
      const sets = [...new Array(3)]
        .map((e, i) => createSet([String(i)]))
        .reduce((s, curr) => {
          return {
            ...s,
            [curr.id]: curr,
          };
        }, {});
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = sets;
      expect(getSetOwnerId(game, "213")).toBe(null);
    });
  });
  describe("getSetById()", () => {
    it("should return set given a set id", () => {
      const p1Set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = {
        [p1Set.id]: p1Set,
      };
      expect(getSetById(game, p1Set.id)).toEqual(p1Set);
    });
    it("should return null if set does not exist", () => {
      const p1Set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = {
        [p1Set.id]: p1Set,
      };
      expect(getSetById(game, "bad-id")).toEqual(null);
    });
  });
  describe("getSetIds()", () => {
    it("should return the set ids of a given player", () => {
      const sets = [...new Array(3)]
        .map((e, i) => createSet([String(i)]))
        .reduce((s, curr) => {
          return {
            ...s,
            [curr.id]: curr,
          };
        }, {});
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = sets;
      expect(getSetIds(game, "p1")).toEqual(Object.keys(sets));
    });
  });
  describe("getAllSetIds()", () => {
    it("should return all set ids in the game", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      players.forEach((pid) => {
        const sets = [...new Array(3)]
          .map((e, i) => createSet([String(i)]))
          .reduce((s, curr) => {
            return {
              ...s,
              [curr.id]: curr,
            };
          }, {});
        game.players[pid].sets = sets;
      });
      expect(getAllSetIds(game)).toEqual([
        ...Object.keys(game.players["p1"].sets),
        ...Object.keys(game.players["p2"].sets),
        ...Object.keys(game.players["p3"].sets),
      ]);
    });
    it("should return an empty array if there are no sets in the game", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(getAllSetIds(game)).toEqual([]);
    });
  });
  describe("getAllFullSetIds()", () => {
    it("should return the set ids of all full sets", () => {
      const p1Set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      const p2Set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
        "v1-b64350b0-d16f-4f2f-97cb-4096fd0321fc", // house
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = {
        [p1Set.id]: p1Set,
      };
      game.players.p2.sets = {
        [p2Set.id]: p2Set,
      };
      expect(getAllFullSetIds(game)).toEqual([p1Set.id, p2Set.id]);
    });
    it("should return an empty array when there are no full sets on board", () => {
      const p1Set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
      ]);
      const p2Set = createSet([
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = {
        [p1Set.id]: p1Set,
      };
      game.players.p2.sets = {
        [p2Set.id]: p2Set,
      };
      expect(getAllFullSetIds(game)).toEqual([]);
    });
  });
  describe("playerHasColorOnBoard()", () => {
    it("should return true if player has a set that matches the given color", () => {
      const p1Set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = {
        [p1Set.id]: p1Set,
      };
      expect(
        playerHasColorOnBoard(game, { playerId: "p1", color: "brown" })
      ).toBe(true);
    });
    it("should return false if player does not have a set that matches the given color", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(
        playerHasColorOnBoard(game, { playerId: "p1", color: "brown" })
      ).toBe(false);
    });
  });
  describe("playerCanIssueCharge()", () => {
    it("should return true if at least one other player has cash", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p2.cash = ["v1-a5907b43-58aa-491b-861b-4f5733f30615"];
      expect(playerCanIssueCharge(game, { playerId: "p1" })).toBe(true);
    });
    it("should return true if at least one other player has some properties", () => {
      const set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p2.sets = {
        [set.id]: set,
      };
      expect(playerCanIssueCharge(game, { playerId: "p1" })).toBe(true);
    });
    it("should return false if no other player has any assets on board", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(playerCanIssueCharge(game, { playerId: "p1" })).toBe(false);
    });
  });
  describe("playerCanDealbreak()", () => {
    it("should return true if at least one other player on board has a full set", () => {
      const set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p2.sets = {
        [set.id]: set,
      };
      expect(playerCanDealbreak(game, { playerId: "p1" })).toBe(true);
    });
    it("shoud return false if the only full set(s) on the board belong to the player", () => {
      const set = createSet([
        "v1-593bb818-2639-4091-8997-a2f875d373ca", // brown
        "v1-d137868e-9a96-4dfe-b507-0188ddd20fdf", // brown
      ]);
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      game.players.p1.sets = {
        [set.id]: set,
      };
      expect(playerCanDealbreak(game, { playerId: "p1" })).toBe(false);
    });
    it("should return false if there are no full sets on the board", () => {
      const players = ["p1", "p2", "p3"];
      const game = createGame(players);
      expect(playerCanDealbreak(game, { playerId: "p1" })).toBe(false);
    });
  });
});

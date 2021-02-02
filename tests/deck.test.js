import { generateDeck, drawCards } from "../game/deck";

describe("Deck Methods", () => {
  describe("generateDeck()", () => {
    it("should generate a deck of 106 cards", () => {
      const deck = generateDeck();
      expect(deck.length).toBe(106);
    });
    it("should generate a deck with a random ordering", () => {
      const deckA = generateDeck().join("");
      const deckB = generateDeck().join("");
      expect(deckA).not.toBe(deckB);
    });
  });
  describe("drawCards()", () => {
    it("should not affect the deck passed in", () => {
      const deck = generateDeck();
      drawCards(deck, 2);
      expect(deck.length).toBe(106);
    });
    it("should return null if the number of cards to draw exceeds the number of cards in the deck", () => {
      const deck = generateDeck();
      const result = drawCards(deck, 107);
      expect(result).toBe(null);
    });
    it("should return a copy of the deck with the back N cards removed", () => {
      const deck = generateDeck();
      const { deck: newDeck } = drawCards(deck, 5);
      expect(newDeck.length).toBe(deck.length - 5);
    });
    it("should return the last N cards of the deck", () => {
      const deck = generateDeck();
      const { deck: newDeck, cards } = drawCards(deck, 5);
      const lastDeckElements = deck.slice(deck.length - 5);
      expect(lastDeckElements.join("")).toBe(cards.join(""));
      const newDeckLastElements = newDeck.slice(newDeck.length - 5);
      expect(newDeckLastElements.join("")).not.toBe(lastDeckElements.join(""));
    });
  });
});

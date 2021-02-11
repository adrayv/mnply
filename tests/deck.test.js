import { generateDeck, drawCards } from "../game/utils/deck";

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
      drawCards(deck, [], 2);
      expect(deck.length).toBe(106);
    });
    it("should return a copy of the deck with the back N cards removed", () => {
      const deck = generateDeck();
      const { deck: newDeck } = drawCards(deck, [], 5);
      expect(newDeck.length).toBe(deck.length - 5);
    });
    it("should return the last N cards of the deck", () => {
      const deck = generateDeck();
      const { deck: newDeck, cards, discard } = drawCards(deck, [], 5);
      const lastDeckElements = deck.slice(deck.length - 5);
      expect(lastDeckElements.join("")).toBe(cards.join(""));
      const newDeckLastElements = newDeck.slice(newDeck.length - 5);
      expect(newDeckLastElements.join("")).not.toBe(lastDeckElements.join(""));
      expect(discard.length).toBe(0);
    });
    describe("when num cards to draw is the length of the deck", () => {
      it("should return the remaining cards from the deck", () => {
        const deck = [1, 2, 3];
        const { cards } = drawCards(deck, [], 3);
        expect(cards).toEqual(deck);
      });
      it("should replace the deck with a shuffled version of the cards from the discard", () => {
        const deck = [1, 2, 3];
        const discard = [4, 5];
        const { deck: newDeck, cards, discard: newDiscard } = drawCards(
          deck,
          discard,
          3
        );
        expect(newDeck.length).toEqual(2);
        expect(cards).toEqual(deck);
        expect(newDiscard).toEqual([]);
      });
      it("should return empty deck and discard theres nothing in the discard", () => {
        const deck = [1, 2, 3];
        const { deck: newDeck } = drawCards(deck, [], 3);
        expect(newDeck).toEqual([]);
      });
    });
    describe("when cards have to be drawn from the discard", () => {
      it("should deplete all cards if num cards to draw is number of cards available", () => {
        const deck = [1, 2, 3];
        const discard = [4, 5];
        const { deck: newDeck, discard: newDiscard, cards } = drawCards(
          deck,
          discard,
          5
        );
        expect(cards.length).toBe(5);
        expect(newDeck).toEqual([]);
        expect(newDiscard).toEqual([]);
      });
      it("should return all cards from the deck and some from the discard", () => {
        const deck = [1, 2, 3];
        const discard = [4, 5, 6];
        const { deck: newDeck, discard: newDiscard, cards } = drawCards(
          deck,
          discard,
          4
        );
        expect(cards.length).toBe(4);
        expect(newDeck.length).toBe(2);
        expect(newDiscard).toEqual([]);
        expect(newDeck.every((card) => card >= 4)).toBe(true);
        const discardedCardsInCards = cards.filter((card) => card >= 4);
        expect(discardedCardsInCards.length).toBe(1);
        expect(discardedCardsInCards[0] >= 4).toBe(true);
      });
    });
    describe("when the num cards to draw exceeds all cards available", () => {
      it("should drain and return all cards from deck and discard", () => {
        const deck = [1, 2, 3];
        const discard = [4, 5];
        const { deck: newDeck, discard: newDiscard, cards } = drawCards(
          deck,
          discard,
          6
        );
        expect(cards.length).toBe(5);
        expect(newDeck).toEqual([]);
        expect(newDiscard).toEqual([]);
      });
    });
  });
});

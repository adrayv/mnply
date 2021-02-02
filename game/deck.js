import cards from "./cards.json";
import { shuffle } from "../utils/array";

export const generateDeck = () => {
  const cardIds = Object.keys(cards);
  return shuffle(cardIds);
};

export const drawCards = (deck, numCardsToDraw) => {
  if (numCardsToDraw <= deck.length) {
    return {
      deck: deck.slice(0, deck.length - numCardsToDraw),
      cards: deck.slice(deck.length - numCardsToDraw),
    };
  }
  return null;
};

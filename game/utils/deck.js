import cards from "../cards.json";
import { shuffle } from "../../utils/array";

export const cardInfo = {
  red: {
    rentTiers: [2, 3, 6],
  },
  yellow: {
    rentTiers: [2, 4, 6],
  },
  mint: {
    rentTiers: [1, 2],
  },
  orange: {
    rentTiers: [1, 3, 5],
  },
  green: {
    rentTiers: [2, 4, 7],
  },
  blue: {
    rentTiers: [3, 8],
  },
  purple: {
    rentTiers: [1, 2, 4],
  },
  black: {
    rentTiers: [1, 2, 3, 4],
  },
  sky: {
    rentTiers: [1, 2, 3],
  },
  brown: {
    rentTiers: [1, 2],
  },
};

/**
 * @returns {Array(CardId)}
 */
export const generateDeck = () => {
  const cardIds = Object.keys(cards);
  return shuffle(cardIds);
};

/**
 *
 * @param {Array(CardId)} deck
 * @param {Array(CardId)} discard
 * @param {Number} numCardsToDraw
 * @return {Object}
 * @property {Array(CardId)} deck
 * @property {Array(CardId)} discard
 * @property {Array(CardId)} cards
 */
export const drawCards = (deck, discard, numCardsToDraw) => {
  if (numCardsToDraw < deck.length) {
    const divide = deck.length - numCardsToDraw;
    return {
      deck: deck.slice(0, divide),
      discard,
      cards: deck.slice(divide),
    };
  } else if (numCardsToDraw === deck.length) {
    return {
      deck: shuffle(discard),
      discard: [],
      cards: deck,
    };
  } else if (numCardsToDraw <= deck.length + discard.length) {
    const numToDrawFromShuffle = numCardsToDraw - deck.length;
    const shuffledDiscard = shuffle(discard);
    const shuffleDivide = shuffledDiscard.length - numToDrawFromShuffle;
    const remainingCardsFromShuffle = shuffledDiscard.slice(0, shuffleDivide);
    const cardsDrawnFromShuffle = shuffledDiscard.slice(shuffleDivide);
    return {
      deck: remainingCardsFromShuffle,
      discard: [],
      cards: [...deck, ...cardsDrawnFromShuffle],
    };
  } else {
    // where the num to draw exceeds all cards available
    return {
      deck: [],
      discard: [],
      cards: [...deck, ...shuffle(discard)],
    };
  }
};

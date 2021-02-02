import { drawCards, generateDeck } from "./deck";

/**
 * Resitrctions:
 * Max Players ~= 20
 */
export const createGame = (playerIds = []) => {
  if (playerIds.length < 2) {
    return null;
  }
  const initialState = {
    players: {},
    turn: playerIds[0],
    order: playerIds,
    remainingMoves: 3,
    remainingCharges: [],
    deck: null,
    discard: [],
    playedAsCash: {},
    rentMultiplier: 1,
    wilds: {},
    winner: null,
  };

  let initialDeck = generateDeck();

  playerIds.forEach((id, i) => {
    const { deck, cards } = drawCards(initialDeck, i === 0 ? 7 : 5);
    initialDeck = deck;
    initialState.players[id] = {
      cash: [],
      hand: cards,
      sets: [],
      availableMoves: [],
    };
  });

  initialState.deck = initialDeck;

  return initialState;
};

import { drawCards, generateDeck } from "./deck";
import { getSetColor, isFullSet } from "./set";

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 10;

/**
 *
 * @param {Array(PlayerId)} playerIds
 * @returns {GameState}
 */
export const createGame = (playerIds = []) => {
  if (playerIds.length < MIN_PLAYERS || playerIds.length > MAX_PLAYERS) {
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
    const { deck, cards } = drawCards(initialDeck, [], i === 0 ? 7 : 5);
    initialDeck = deck;
    initialState.players[id] = {
      cash: [],
      hand: cards,
      sets: {},
      availableMoves: [],
    };
  });

  initialState.deck = initialDeck;

  return initialState;
};

/**
 *
 * @param {GameState} state
 * @returns {Object(Player)}
 */
export const getPlayers = (state) => state.players;

/**
 *
 * @param {GameState} state
 * @returns {Array(PlayerId)}
 */
export const getPlayerIds = (state) => Object.keys(getPlayers(state));

/**
 *
 * @param {GameState} state
 * @param {PlayerId} playerId
 * @returns {Player}
 */
export const getPlayerById = (state, playerId) => getPlayers(state)[playerId];

/**
 *
 * @param {GameState} state
 * @param {PlayerId} playerId
 * @returns {Array(CardId)}
 */
export const getHand = (state, playerId) => getPlayerById(state, playerId).hand;

/**
 *
 * @param {GameState} state
 * @param {PlayerId} playerId
 * @returns {Array(CardId)}
 */
export const getCash = (state, playerId) => getPlayerById(state, playerId).cash;

/**
 *
 * @param {GameState} state
 * @param {PlayerId} playerId
 * @returns {Object(Set)}
 */
export const getSets = (state, playerId) => getPlayerById(state, playerId).sets;

/**
 *
 * @param {GameState} state
 * @param {SetId} setId
 * @returns {PlayerId}
 */
export const getSetOwnerId = (state, setId) => {
  const playerIds = getPlayerIds(state);
  const result = playerIds.filter((pid) => {
    const setIds = getSetIds(state, pid);
    return setIds.find((sid) => sid === setId);
  });
  if (result.length !== 1) return null;
  return result[0];
};

/**
 *
 * @param {GameState} state
 * @param {SetId} setId
 */
export const getSetById = (state, setId) => {
  const allSets = getPlayerIds(state).flatMap((pid) =>
    Object.values(getSets(state, pid))
  );
  return allSets.find((set) => set.id === setId) || null;
};

/**
 *
 * @param {GameState} state
 * @param {PlayerId} playerId
 * @returns {Array(SetId)}
 */
export const getSetIds = (state, playerId) =>
  Object.keys(getSets(state, playerId));

/**
 *
 * @param {GameState} state
 * @returns {Array(SetId)}
 */
export const getAllSetIds = (state) => {
  const playerIds = getPlayerIds(state);
  return playerIds.flatMap((pid) => getSetIds(state, pid));
};

/**
 *
 * @param {GameState} state
 * @returns {Array(SetId)}
 */
export const getAllFullSetIds = (state) => {
  const allSetIds = getAllSetIds(state);
  return allSetIds.filter((setId) =>
    isFullSet(state, getSetById(state, setId))
  );
};

/**
 *
 * @param {GameState} state
 * @param {Object} options
 * @property {PlayerId} playerId
 * @property {red|yellow|mint|orange|green|blue|purple|black|sky|brown} color
 * @returns {Boolean}
 */
export const playerHasColorOnBoard = (state, { playerId, color }) => {
  const setIds = getSetIds(state, playerId);
  return Boolean(
    setIds.find(
      (setId) => getSetColor(state, getSetById(state, setId)) === color
    )
  );
};

/**
 *
 * @param {GameState} state
 * @param {Object} options
 * @property {PlayerId} playerId
 * @returns {Boolean}
 */
export const playerCanIssueCharge = (state, { playerId }) => {
  const otherPlayerIds = getPlayerIds(state).filter((pid) => pid !== playerId);
  return otherPlayerIds.some((pid) => {
    const cash = getCash(state, pid);
    const sets = getSets(state, pid);
    const hasSomeCash = cash.length > 0;
    const hasSomeSets = Object.keys(sets).length > 0;
    return hasSomeCash || hasSomeSets;
  });
};

/**
 *
 * @param {GameState} state
 * @param {Object} options
 * @property {PlayerId} playerId
 * @returns {Boolean}
 */
export const playerCanDealbreak = (state, { playerId }) => {
  const allFullSets = getAllFullSetIds(state);
  const otherPlayerFullSets = allFullSets.filter(
    (setId) => getSetOwnerId(state, setId) !== playerId
  );
  return otherPlayerFullSets.length > 0;
};

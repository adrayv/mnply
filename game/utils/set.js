import { v4 as uuidv4 } from "uuid";
import { getPropertyColor, isPureWild, isSomeProperty } from "./card";
import { cardInfo } from "./deck";

/**
 *
 * @param {Array} cards
 * @returns {Set}
 */
export const createSet = (cards = []) => ({
  id: uuidv4(),
  cards,
});

/**
 *
 * @param {red|yellow|mint|orange|green|blue|purple|black|sky|brown} setColor
 * @returns {Number}
 */
export const getNumToFullSet = (setColor) =>
  cardInfo[setColor] ? cardInfo[setColor].rentTiers.length : null;

/**
 *
 * @param {Set} set
 * @returns {Array(CardId)}
 */
export const getPropertiesFromSet = (set) => {
  const cards = set.cards || [];
  return cards.filter((cardId) => isSomeProperty(cardId));
};

/**
 *
 * @param {Set} set
 * @returns {Number}
 */
export const getSetSize = (set) => getPropertiesFromSet(set).length;

/**
 *
 * @param {Set} set
 * @returns {Number}
 */
export const getTotalSetSize = (set) => (set.cards || []).length;

/**
 *
 * @param {GameState} state
 * @param {Set} set
 * @returns {red|yellow|mint|orange|green|blue|purple|black|sky|brown|null}
 */
export const getSetColor = (state, set) => {
  const setProperties = getPropertiesFromSet(set);
  const nonPureWilds = setProperties.filter((cardId) => !isPureWild(cardId));
  if (nonPureWilds.length === 0) {
    return null;
  }
  const cardColors = nonPureWilds.map((cardId) =>
    getPropertyColor(state, cardId)
  );
  const allHaveSameColor = cardColors.every((val, i, arr) => val === arr[0]);
  if (allHaveSameColor) {
    return cardColors[0];
  }
  return null;
};

/**
 *
 * @param {GameState} state
 * @param {Set} set
 * @returns {Boolean}
 */
export const isFullSet = (state, set) => {
  const setSize = getSetSize(set);
  const setColor = getSetColor(state, set);
  const numToFullSet = getNumToFullSet(setColor);
  if (!setColor || !numToFullSet || setSize < numToFullSet) {
    return false;
  }
  return true;
};

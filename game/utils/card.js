import cards from "../cards.json";

/**
 *
 * @param {CardId} cardId
 * @returns {cash|property|wild-property|pure-wild|action|null}
 */
export const getCardType = (cardId) =>
  cards[cardId] ? cards[cardId].type : null;

/**
 *
 * @param {CardId} cardId
 * @returns {Boolean}
 */
export const isProperty = (cardId) => getCardType(cardId) === "property";

/**
 *
 * @param {CardId} cardId
 * @returns {Boolean}
 */
export const isWildProperty = (cardId) => getCardType(cardId) === "wild";

/**
 *
 * @param {CardId} cardId
 * @returns {Boolean}
 */
export const isPureWild = (cardId) => getCardType(cardId) === "pure-wild";

/**
 *
 * @param {CardId} cardId
 * @returns {Boolean}
 */
export const isSomeProperty = (cardId) =>
  isProperty(cardId) || isWildProperty(cardId) || isPureWild(cardId);

/**
 *
 * @param {CardId} cardId
 * @returns {say-no|dealbreaker|sly-deal|forced-deal|birthday|rent|house|hotel|pass-go|debt-collector|double-rent|null}
 */
export const getActionType = (cardId) =>
  getCardType(cardId) === "action" ? cards[cardId].action.type : null;

/**
 *
 * @param {CardId} cardId
 * @returns {Array(red|yellow|mint|orange|green|blue|purple|black|sky|brown|null)}
 */
export const getRentableColors = (cardId) =>
  getActionType(cardId) === "rent" ? cards[cardId].action.colors : null;

/**
 *
 * @param {CardId} cardId
 * @returns {Array(red|yellow|mint|orange|green|blue|purple|black|sky|brown|null)}
 */
export const getWildColors = (cardId) =>
  isWildProperty(cardId) ? cards[cardId].property.colors : null;

/**
 *
 * @param {GameState} state
 * @param {CardId} cardId
 * @returns {red|yellow|mint|orange|green|blue|purple|black|sky|brown|null}
 */
export const getCurrentWildColor = (state, cardId) => {
  const cardType = getCardType(cardId);
  if (cardType !== "wild") {
    return null;
  }
  const wildColor = state.wilds[cardId];
  const allowedWildColors = getWildColors(cardId);
  const wildColorIsValid = Boolean(
    allowedWildColors.find((color) => color === wildColor)
  );
  if (!wildColor || !wildColorIsValid) {
    return null;
  }
  return wildColor;
};

/**
 *
 * @param {GameState} state
 * @param {CardId} cardId
 * @returns {red|yellow|mint|orange|green|blue|purple|black|sky|brown|null}
 */
export const getPropertyColor = (state, cardId) => {
  if (isWildProperty(cardId)) {
    return getCurrentWildColor(state, cardId);
  } else if (isProperty(cardId)) {
    return cards[cardId].property.color;
  } else {
    return null;
  }
};

/**
 * Game Lifecyle
 * 1. Player chooses Move
 * 2. Current game state and move are used to compute next game state
 * 2a. Everyone's next available moves are computed based on the last move
 * 3. Repeat
 */

const Game = {
  createGame: (playerIds) => {
    // return game state
  },
  updateGame: (state, action) => {
    // action {playerId, move}
    // return game state
  },
};

const Card = {
  id: "",
  type: "", // cash | property | wild-property | pure-wild | action
  value: -1,
  action: {
    type: "", // say-no | dealbreaker | sly-deal | forced-deal | birthday | rent | house | hotel | pass-go | debt-collector | double-rent
    // isCash: false,
    rent: {
      colors: [], // color
      canChargeAll: false,
    },
  },
  property: {
    currentColor: "", // color
    supportedColors: [], // color
  },
};

const CardInfo = {
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

const CardUtils = {
  getNumToFullSet: (card) => {}, // returns Number based on length of rentTier
};

const Set = {
  id: "",
  cards: [], // ids
};

const SetUtils = {
  isSetComplete: (set) => {}, // return Bool
  getSetRent: (set) => {}, // return Number - amount the set can charge,
  getSetColor: (set) => {}, // return Color
};

/**
 * placeProperty
 * 	createNewSet
 * 	addToExistingSet
 * 	chooseColor?
 * passGo >>
 * slyDeal >>
 * 	chooseCard >>
 * birthday >>
 * chargeRent >>
 * 	choosePlayers? >>
 * 	chooseColor >>
 * drawCards >>
 * payCharge >>
 * 	chooseCards >>
 * endTurn
 * placeCash >>
 * doubleRent
 * moveCard >>
 * 	changeColor >>
 * 	moveToOtherSet >>
 * dealbreak
 * 	chooseSet
 * sayNo
 * playAction
 * 	playAsCash
 * discardCard
 */

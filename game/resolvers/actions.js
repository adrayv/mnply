const resolve = (state, { cardId, playerId }) => {};

const actionResolvers = {
  "play-action": (state, { playerId, cardId }) => {
    const newState = setAvailableMoves(state, playerId, [
      {
        type: "decision",
        cardId,
        choices: [
          {
            resolver: "play-action-as-cash",
          },
          {
            resolver: "play-action-as-action",
          },
        ],
      },
    ]);
    return newState;
  },
  "play-action-as-cash": (state, { playerId, cardId }) => {
    const newState = moveCardsToCashPile(state, {
      playerId,
      cardIds: [cardId],
    });
    return newState;
  },
  "play-action-as-action": (state, { playerId, cardId }) => {
    const actionType = getActionType(cardId);
    const newState = actionResolvers[actionType](state, { playerId, cardId });
    return newState;
  },
  "pass-go": (state, { playerId }) => {
    const newState = drawCards(state, { numCards: 2, playerId });
    return newState;
  },
};

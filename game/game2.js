const state = {
  players: {
    p1: {
      cash: [],
      hand: [],
      sets: [],
      availableMoves: [],
    },
    p2: {
      cash: [],
      hand: [],
      sets: [],
      availableMoves: [],
    },
  },
  turn: "p1",
  order: ["p1", "p2"],
  remainingMoves: 3,
  remainingCharges: [],
  deck: [],
  discard: [],
  playedAsCash: {},
  rentMultiplier: 1,
  wilds: {},
  winner: null,
};

const gameConfig = {
  cards: {
    rr: {},
  },
};

/*
  
Events
  
initializeGame -> return state
  
p1 avail moves:
- play {cardId: rr}
- play {cardId: states}
- end turn
  
move - play card - (p1, rr)
  
move - create new set {cardId: rr}

p1 avail moves:
- play {cardId: states}
- end turn

move - end turn (p1)

---

*p2 draws 2

p2 avail moves:
- play {vermont}
- play {atlantic}
- play {park place}
- play {pass go}
- play {pass go}
- end turn

move - play - id: pass-go

p2 avail moves:
- play {pass go}
- play {cash 1}
- play {vermont}
- play {atlantic}
- play {park place}
- play {pass go}
- end turn

move - play - id: pass-go

p2 avail moves:
- play {pass go}
- play {cash 1}
- play {vermont}
- play {atlantic}
- play {park place}
- play {cash 2}
- play {birthday}
- end turn

move - end turn

---

*p1 draws 2 

p1 avail moves
- play {cash2}
- play {tennessee}
- play {states}
- end turn

move - cash 2

p1 avail moves
- play {tennessee}
- play {states}
- end turn

move - play states

p1 avail moves
- play {tennessee}
- end turn

move - tennesse

p1 avail moves
- end turn

move - end turn

---

*p2 draws 2

p2 avail moves:
- play {pass go}
- play {cash 1}
- play {vermont}
- play {atlantic}
- play {park place}
- play {cash 2}
- play {birthday}
- play {birthday}
- end turn

play - birthday

* add all players to to charges queue
* set first player in queue's available moves
	
p2 avail moves: 

p1 avail moves:
- select cards to pay charge

move - pay charge - p1 - cash 2

*/

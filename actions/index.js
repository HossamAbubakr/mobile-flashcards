export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_CARD = "ADD_CARD";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    payload: decks,
  };
}

export function addDeck(deckTitle) {
  return {
    type: ADD_DECK,
    payload: deckTitle,
  };
}

export function deleteDeck(deckTitle) {
  return {
    type: DELETE_DECK,
    payload: deckTitle,
  };
}

export function addCard(deckTitle, card) {
  return {
    type: ADD_CARD,
    payload: { deckTitle, card },
  };
}

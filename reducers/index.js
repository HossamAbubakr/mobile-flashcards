import { RECEIVE_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD } from "../actions/index";

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.payload]: {
          title: action.payload,
          questions: [],
        },
      };
    case DELETE_DECK:
      // Getting all the values except the chosen one using destructuring assignment.
      // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      // Ref: https://stackoverflow.com/a/47227198/15253212
      const { [action.payload]: value, ...otherDecks } = state;
      return otherDecks;
    case ADD_CARD:
      const { deckTitle, card } = action.payload;
      return {
        ...state,
        [deckTitle]: {
          ...state[deckTitle],
          questions: state[deckTitle].questions.concat([card]),
        },
      };
    default:
      return state;
  }
}

export default decks;

import { ADDED_GAME_RESULT, ADDING_GAME_RESULT, ADD_GAME_RESULT_FAILURE } from "../actions/types";

const initialState = {
  loading: false,
  gameResults: [],
  error: null,
  successNotification: false,
  gameResult:{}
};

export default function gameResultReducer(state = initialState, action) {
  switch (action.type) {
    case ADDING_GAME_RESULT:
      return {
        ...state,
        loading: true
      }
    case ADDED_GAME_RESULT:
      return {
        ...state,
        loading: false,
        error: null,
        gameResult: action.payload
      }
    case ADD_GAME_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
        return state;
  }
}

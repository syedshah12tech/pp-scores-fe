import { ADDED_PLAYER, ADDING_PLAYER, ADD_PLAYER_FAILURE, 
  LOADED_TOP_PLAYERS, LOADING_ALL_PLAYERS, LOADING_TOP_PLAYERS, LOAD_ALL_PLAYERS_FAILURE, LOAD_TOP_PLAYERS_FAILURE, LOADED_ALL_PLAYERS,
} from "../actions/types";

const initialState = {
  loading: false,
  topPlayers: [],
  allPlayers: [],
  error: null,
  successNotification: false,
  player: {}
};

export default function playerReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_TOP_PLAYERS:
    case ADDING_PLAYER:
    case LOADING_ALL_PLAYERS:
      return {
        ...state,
        loading: true
      }
    case LOADED_TOP_PLAYERS:
      return {
        ...state,
        loading: false,
        error: null,
        topPlayers: action.payload
      }
    case LOADED_ALL_PLAYERS:
      return {
        ...state,
        loading: false,
        error: null,
        allPlayers: action.payload
      }  
    case ADDED_PLAYER:
      return {
        ...state,
        loading: false,
        error: null,
        player: action.payload
      }
    case LOAD_TOP_PLAYERS_FAILURE:
    case ADD_PLAYER_FAILURE:
    case LOAD_ALL_PLAYERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
}
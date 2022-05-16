import axios from 'axios';
import { LOADED_TOP_PLAYERS, LOADING_TOP_PLAYERS, LOAD_TOP_PLAYERS_FAILURE,
  ADDED_PLAYER, ADDING_PLAYER, ADD_PLAYER_FAILURE,
  LOADED_ALL_PLAYERS, LOADING_ALL_PLAYERS, LOAD_ALL_PLAYERS_FAILURE,
} from './types';

import { successNotificationStart, errorNotificationStart } from './notificationActions';
import { checkForApplicationErrors, baseGraphURL } from './common';

export const getTopPlayers = ({count}) => {
  return async (dispatch) => {
    try{
      dispatch(loadingTopPlayers());

      let res = await axios({
        url: baseGraphURL,
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        data: {
          "query": `query{ 
            topPlayers(count: ${count}) { 
              playerID
              name
              winLossRatio
            }
          }`
        }
      });
      checkForApplicationErrors(res);

      dispatch(loadedTopPlayers(res.data.data.topPlayers));
    } catch(e) {
      console.error("Got Error: ", e);
      dispatch(loadTopPlayersFailure(e));
    }
  }
}

export const addPlayer = (player) => {
  return async (dispatch) => {
    try {
      dispatch(addingPlayer());

      let res = await axios({
        url: baseGraphURL,
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        data: {
          "query": `mutation{ 
            addPlayer(name: "${player.name}") { 
              playerID
            }
          }`
        }
      });
      checkForApplicationErrors(res);

      dispatch(successNotificationStart());
      dispatch(addedPlayer(res.data.data.addPlayer));
    } catch(e) {
      console.error("Got Error: ", e);
      dispatch(errorNotificationStart());
      dispatch(addPlayerFailure(e));
    }
  }
}

// TODO: Should take parameters that could be used to filter, sort, search
// results. And the name is not correct. It should instead be named getPlayers
export const getAllPlayers = () => {
  return async (dispatch) => {
    try{
      dispatch(loadingAllPlayers());

      let res = await axios({
        url: baseGraphURL,
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        data: {
          "query": `query{ 
            allPlayers { 
              playerID
              name,
              wins,
              losses,
              winLossRatio
            }
          }`
        }
      });
      checkForApplicationErrors(res);

      dispatch(successNotificationStart());
      dispatch(loadedAllPlayers(res.data.data.allPlayers));
    } catch(e) {
      console.error("Got Error: ", e);
      dispatch(errorNotificationStart());
      dispatch(loadAllPlayersFailure(e));
    }
  }
}

const loadingTopPlayers = () => ({
  type: LOADING_TOP_PLAYERS
});
const loadedTopPlayers = (payload) => ({
  type: LOADED_TOP_PLAYERS,
  payload
});
const loadTopPlayersFailure = error => ({
  type: LOAD_TOP_PLAYERS_FAILURE,
  payload: {
    error: error
  }
})

const addingPlayer = () => ({
  type: ADDING_PLAYER
});
const addedPlayer = (payload) => ({
  type: ADDED_PLAYER,
  payload
});
const addPlayerFailure = error => ({
  type: ADD_PLAYER_FAILURE,
  payload: {
    error: error
  }
})

const loadingAllPlayers = () => ({
  type: LOADING_ALL_PLAYERS
})
const loadedAllPlayers = (payload) => ({
  type: LOADED_ALL_PLAYERS,
  payload
});
const loadAllPlayersFailure = error => ({
  type: LOAD_ALL_PLAYERS_FAILURE,
  payload: {
    error: error
  }
})



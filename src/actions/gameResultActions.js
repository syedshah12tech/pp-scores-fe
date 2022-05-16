import axios from 'axios';
import { successNotificationStart, errorNotificationStart } from './notificationActions';
import { LOADING_GAME_RESULTS, LOAD_GAME_RESULTS_FAILURE, LOADED_GAME_RESULTS,
  ADDING_GAME_RESULT, ADDED_GAME_RESULT, ADD_GAME_RESULT_FAILURE } 
from './types';
import { baseGraphURL, checkForApplicationErrors } from './common';

// TODO: getGameResults is not tested because backend implementation is not
// complete at the moment - 05/15/22
export const getGameResults = () => {
  return async (dispatch) => {
    try {
      dispatch(loadingGameResults());

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

      dispatch(successNotificationStart());
      dispatch(loadedGameResults(res.data.data.gameResults));
    } catch(e) {
      console.error("Got Error: ", e);
      dispatch(errorNotificationStart());
      dispatch(loadGameResultsFailure(e));
    }
  }
}

const loadingGameResults = () => ({
  type: LOADING_GAME_RESULTS
})
const loadedGameResults = (payload) => ({
  type: LOADED_GAME_RESULTS,
  payload
});
const loadGameResultsFailure = error => ({
  type: LOAD_GAME_RESULTS_FAILURE,
  payload: {
    error: error
  }
})

export const addGameResult = (gameResult) => {
  return async (dispatch) => {
    try {
      dispatch(addingGameResult());

      let res = await axios({
        url: baseGraphURL,
        method: 'post',
        headers: {
          "content-type": "application/json"
        },
        data: {
          "query": `mutation{ 
            newGameResult(
              playerIDs: ${JSON.stringify(gameResult.playerIDs)},
              winnerIDs: ${JSON.stringify(gameResult.winnerIDs)},
              resultDate: "${gameResult.resultDate}"
            ) { 
              gameResultID
              players {
                name
              }
            }
          }`
        }
      });
      checkForApplicationErrors(res);

      dispatch(successNotificationStart());
      dispatch(addedGameResult(res.data.data.addGameResult));
    } catch (e) {
      console.error("Got Error: ", e);
      dispatch(errorNotificationStart());
      dispatch(addGameResultFailure(e));
    }
  }
}
const addingGameResult = () => ({
  type: ADDING_GAME_RESULT
});
const addedGameResult = (payload) => ({
  type: ADDED_GAME_RESULT,
  payload
});
const addGameResultFailure = error => ({
  type: ADD_GAME_RESULT_FAILURE,
  payload: {
    error: error
  }
})
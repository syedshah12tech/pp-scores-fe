import {
  SUCCESS_NOTIFICATION_START, SUCCESS_NOTIFICATION_END,
  ERROR_NOTIFICATION_START, ERROR_NOTIFICATION_END,
} from "../actions/types";

const initialState = {
  successNotification: false,
  errorNotification: false
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_NOTIFICATION_START: {
      return {
        ...state,
        successNotification: true
      }
    }
    case SUCCESS_NOTIFICATION_END: {
      return {
        ...state,
        successNotification: false
      }
    }
    case ERROR_NOTIFICATION_START: {
      return {
        ...state,
        errorNotification: true
      }
    }
    case ERROR_NOTIFICATION_END: {
      return {
        ...state,
        errorNotification: false
      }
    }
    default:
      return state;
  }
}
import {SUCCESS_NOTIFICATION_START, SUCCESS_NOTIFICATION_END, ERROR_NOTIFICATION_START, ERROR_NOTIFICATION_END} from './types';

export const successNotificationStart = () => ({
  type: SUCCESS_NOTIFICATION_START
})
export const successNotificationEnd = () => ({
  type: SUCCESS_NOTIFICATION_END
})
export const errorNotificationStart = () => ({
  type: ERROR_NOTIFICATION_START
})
export const errorNotificationEnd = () => ({
  type: ERROR_NOTIFICATION_END
})
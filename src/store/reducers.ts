import { ModifiedAlert, Store } from "../lib/types";
import {
  FETCH_ALERTS,
  ACKNOWLEDGE_ALERT
} from './constants';

const initialState = {
  alerts: []
};

export const contactsReducer = ( store: Store = initialState, action: any ) => {
  switch (action.type) {
    case FETCH_ALERTS: {

      const { alerts } = action;

      return {
        ...store,
        alerts: alerts
      }
    }
    case ACKNOWLEDGE_ALERT: {
      const newAlerts = [...store.alerts];
      const idMatches = (alert: ModifiedAlert) => alert.errorId === action.errorId;
      const alertIndex = newAlerts.findIndex(idMatches);
      newAlerts[alertIndex].acknowledged = true;
      return {
        ...store,
        alerts: newAlerts
      }
    }
    default: {
      return store
    }
  }
};
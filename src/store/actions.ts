import data from '../data.json';
import { getAlerts } from '../lib/helpers';
import {
  ACKNOWLEDGE_ALERT,
  FETCH_ALERTS
} from './constants';

export const fetchAlerts = () => {

  const contacts = JSON.parse(JSON.stringify(data));

  const alerts = getAlerts(contacts);

  alerts.sort((a, b) => {
    return b.errorTime - a.errorTime
  }).reverse();
  
  return { type: FETCH_ALERTS, alerts }
}

export const acknowledgeAlert = (contactId: string, errorId: string) => {
  return { type: ACKNOWLEDGE_ALERT, contactId, errorId}
}
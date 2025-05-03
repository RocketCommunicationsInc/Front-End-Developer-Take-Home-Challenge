import {Contact} from "./contact.model";

/**
 * This interface extends a Contact to include information about the Contact's
 * Alert status data.  That is, for each Alert contained in the Contact we keep
 * tabs on whether the Alert has been acknowledged by the GRM operator (user)
 * or not.
 */
export interface ContactWithAlertStatus extends Contact {

  // Here we map each alert's unique ID to a boolean value indicating whether
  // that specific alert has been acknowledged (true) or not (false).
  alertStatus: {
    [alertId: string]: boolean
  }
}

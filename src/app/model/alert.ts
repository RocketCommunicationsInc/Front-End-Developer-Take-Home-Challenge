/**
 * Interface to represent alerts
 */
export interface Alert {
  /**
   * Unique id of the alert
   */
  errorId: string;
  /**
   * Alert severity - might be represented by an enum if all severities are known
   */
  errorSeverity: string;
  /**
   * Alert category - might be represented by an enum if all catagories are known
   */
  errorCategory: string;
  /**
   * Alert message. Short?
   */
  errorMessage: string;
  /**
   * Long alert message. Detailed?
   */
  longMessage: string;
  /**
   * Timestamp of the alert
   */
  errorTime: number;
  /**
   * Not sure. May represent a visual state?
   */
  selected: boolean;
  /**
   * Not sure
   */
  new: boolean;
  /**
   * Not sure. May represent a visual state?
   */
  expanded: boolean;
}

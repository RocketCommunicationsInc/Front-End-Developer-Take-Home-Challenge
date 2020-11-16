import {InjectionToken} from "@angular/core";

/**
 * Injection token for instances of DataPathsService
 */
export const DataPathsToken = new InjectionToken<DataPathsService>("DataPaths");

/**
 * Interface used to get the loading paths to various types of data. It doesn't really mean much in this application,
 * but this pattern could be used to load data paths from various sources (JSON config, environment variables, etc) and
 * this entire module could be separate and imported as needed.
 */
export interface DataPathsService {
  /**
   * Get the path for loading contacts
   */
  getContactsPath(): string;

  /**
   * Get the path for loading alerts
   */
  getAlertsPath(): string;
}

import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";

/**
 * Injection token for instances of DataService
 */
export const DataServiceToken = new InjectionToken<DataService>("DataService");

/**
 * Interface that can be used to load data from a path. The actual method of loading the data (HTTP, filesystem, etc)
 * is left up to the implementor.
 */
export interface DataService {
  /**
   * Load data at a path. The return Observable is designed to be left hot so that updated data could be loaded, but
   * this is not a requirement and the consumers will still work as expected.
   * @param dataPath
   */
  getData<T>(dataPath: string): Observable<T[]>;
}

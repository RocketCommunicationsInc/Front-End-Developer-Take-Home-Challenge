import {Observable} from "rxjs";
import {InjectionToken} from "@angular/core";

export const DataServiceToken = new InjectionToken<DataService>("DataService");

export interface DataService {
  getData<T>(dataPath: string): Observable<T[]>;
}

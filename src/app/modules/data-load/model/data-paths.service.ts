import {InjectionToken} from "@angular/core";

export const DataPathsToken = new InjectionToken<DataPathsService>("DataPaths");

export interface DataPathsService {
  getContactsPath(): string;
  getAlertsPath(): string;
}

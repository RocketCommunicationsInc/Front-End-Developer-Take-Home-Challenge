import {DataPathsService} from "../../data-load/model/data-paths.service";
import {Injectable} from "@angular/core";

/**
 * Simple implementation of {@link DataPathsService} that returns the paths of data from the "assets" folder.
 */
@Injectable()
export class AssetsDataPathService implements DataPathsService {
  /**
   * Get the path to the alerts data
   */
  getAlertsPath(): string {
    return "assets/alerts.json";
  }

  /**
   * Get the path to the contacts data
   */
  getContactsPath(): string {
    return "assets/contacts.json";
  }
}

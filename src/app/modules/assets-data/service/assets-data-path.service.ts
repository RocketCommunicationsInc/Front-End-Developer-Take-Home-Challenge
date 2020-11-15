import {DataPathsService} from "../../data-load/model/data-paths.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AssetsDataPathService implements DataPathsService {
  getAlertsPath(): string {
    return "assets/alerts.json";
  }

  getContactsPath(): string {
    return "assets/contacts.json";
  }
}

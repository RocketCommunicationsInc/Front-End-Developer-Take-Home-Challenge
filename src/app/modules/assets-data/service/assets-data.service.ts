import {DataService} from "../../data-load/model/data.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AssetsDataService implements DataService {

  constructor(private http: HttpClient) {
  }

  getData<T>(dataPath: string): Observable<T[]> {
    return this.http.get<T[]>(dataPath);
  }
}

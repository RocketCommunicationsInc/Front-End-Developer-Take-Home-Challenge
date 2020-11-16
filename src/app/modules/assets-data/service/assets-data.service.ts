import {DataService} from "../../data-load/model/data.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

/**
 * Simple implementation of {@link DataService} that loads data from a specified path using the HttpClient
 */
@Injectable()
export class AssetsDataService implements DataService {

  /**
   * ctor
   * @param http
   */
  constructor(private readonly http: HttpClient) {
  }

  /**
   * Loads data and returns it. By definition, `http.get()` will complete the Observable, but an implementation
   * could combine HTTP with WebSockets data to provide a continuously updating source of data.
   * @param dataPath
   */
  getData<T>(dataPath: string): Observable<T[]> {
    return this.http.get<T[]>(dataPath);
  }
}

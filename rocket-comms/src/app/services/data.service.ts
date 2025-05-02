import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // TODO(gabriel): NOTE: We're not going to make a real backend call to get
  //  data for the dashboard.  Instead, we're just going to read it from our
  //  test data file.  I've copied over the contents of data.json to
  //  assets/mock-data.json.
  private dataUrl: string = 'assets/mock-data.json'

  constructor(private httpClient: HttpClient) {
    // No-op.
  }

  /**
   * Gets the data for the dashboard.
   */
  public getData(): Observable<any> {
    return this.httpClient.get<any>(this.dataUrl);
  }
}

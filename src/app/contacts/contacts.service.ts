import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ConfigService } from '../shared/config.service'
import { Observable, Subject, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

interface ContactsData {
  _id: string;
  contactId: string;
  contactStatus: string;
  contactName: number;
  contactGround: string;
  contactSatellite: string;
  contactEquipment: string;
  contactState: string;
  contactStep: string;
  contactDetail: string;
  contactBeginTimestamp: number;
  contactEndTimestamp: number;
  contactLatitude: number;
  contactLongitude: number;
  contactAzimuth: number;
  contactElevation: number;
  contactResolution: string;
  contactResolutionStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  path: string = this.config.contactsAPI
  public onError = new Subject<string>()

  constructor(
    private config: ConfigService,
    private http: HttpClient,
  ) { }

  public getData(path = this.path) : Observable<ContactsData[]> {
    return this.http.get<ContactsData[]>(path)
    .pipe(
      map((response: ContactsData[]) => response),
      catchError(error => {
        this.onError.next(error.message)
        return throwError(error)
      })
    )
  }
}

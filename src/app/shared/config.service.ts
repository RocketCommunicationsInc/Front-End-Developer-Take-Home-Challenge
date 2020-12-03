import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  alertsAPI: string
  contactsAPI: string
  
  constructor() { }
}

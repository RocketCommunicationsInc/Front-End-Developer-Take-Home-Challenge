import { HttpHeaders, HttpParams } from '@angular/common/http';

//Header
export interface IRequestOptions {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | Array<string> };
  observe?: any;
  params?: HttpParams | { [param: string]: string | Array<string> };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export const httpOptions: IRequestOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  }),
  params: null,
  observe: 'response'
};

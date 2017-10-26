import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ErrorService } from './error.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  
  public static host = 'localhost';
  public static port = '8080';
  //public static domain = 'mean-auth-messages.herokuapp.com';

  public static url = 'http://'+ HttpService.host + ':' + HttpService.port;
  //public static url = 'https://'+ HttpService.domain;
  constructor(
    private http: Http,
    private _errorService: ErrorService
  ) { }

  get(endpoint: string, headersObject: Object): Observable<any> {
    let headers: Headers = new Headers(headersObject);
    let options: RequestOptions = new RequestOptions(
      {headers: headers}
    );

    return this.http.get(HttpService.url + endpoint, options)
      .map(
        (res: Response): Promise<any> => {
          return res.json();
        }
      )
      .catch(
        (err: Response) => {
          if(err.status == 401) {
            return Observable.throw(err);            
          }
        });
  }

  post(endpoint: string, body: any, headersObject: Object): Observable<any> {
    let headers: Headers = new Headers(headersObject);
    let options: RequestOptions = new RequestOptions(
      {headers: headers}
    );

    console.log('Posting to...:', HttpService.url + endpoint);

    return this.http.post(HttpService.url + endpoint, body, options)
      .map(
        (res: Response): Promise<any> => {
          return res.json();
        }
      )
      .catch(
        (err: Response) => {
          //this.errorService.handleError(err);
          return Observable.throw(err)
        });
  }

  put(endpoint: string, body: any, headersObject: Object): Observable<any> {
    let headers: Headers = new Headers(headersObject);
    let options: RequestOptions = new RequestOptions(
      {headers: headers}
    );

    console.log('Updating to...', HttpService.url + endpoint);

    return this.http.put(HttpService.url + endpoint, body, options)
      .map(
        (res: Response): Promise<any> => {
          return res.json();
        }
      )
      .catch(
        (err: Response) => {
          //this.errorService.handleError(err);
          return Observable.throw(err)
        });
  }

  delete(endpoint: string, headersObject: Object): Observable<any> {
    let headers: Headers = new Headers(headersObject);
    let options: RequestOptions = new RequestOptions(
      {headers: headers}
    );

    console.log('Deleting to...', HttpService.url + endpoint);

    return this.http.delete(HttpService.url + endpoint, options)
      .map(
        (res: Response): Promise<any> => {
          return res.json()
        }
      )
      .catch(
        (err: Response) => {
          //this.errorService.handleError(err);
          return Observable.throw(err)
        });
  }

  patch(endpoint: string, body: any, headersObject: Object): Observable<any> {
    let headers: Headers = new Headers(headersObject);
    let options: RequestOptions = new RequestOptions(
      {headers: headers}
    );

    console.log('Patching to...', HttpService.url + endpoint);

    return this.http.patch(HttpService.url + endpoint, body, options)
      .map(
        (res: Response): Promise<any> => {
          return res.json();
        }
      )
      .catch(
        (err: Response) => {
          //this.errorService.handleError(err);
          return Observable.throw(err)
        });
  }

}
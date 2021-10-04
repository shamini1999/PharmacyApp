import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Quarterinfo} from './Quarterinfo';
import { tap, catchError } from 'rxjs/operators';
import { Product } from '../product-detail/product';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {

  //Inject the HttpClient object to the constructor
  constructor(private http: HttpClient) { }

  getQDetails():Observable<Quarterinfo[]> {
    //make a GET call to  "http://localhost:3000/quaterInfo"
    return  this.http.get<Product[]>("http://localhost:3000/quaterInfo").pipe(
      tap((data: any) => console.log('Data Fetched:' + JSON.stringify(data))),
      catchError(this.handleError));
    
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
      errMsg = err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(`Backend returned code ${err.status}`);
      errMsg = err.error.status;
    }
    return throwError(errMsg);
  }

  
}

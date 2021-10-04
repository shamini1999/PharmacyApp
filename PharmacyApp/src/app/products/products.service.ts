import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';

import { Observable, throwError } from 'rxjs';
import { Product } from '../product-detail/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  producturl= 'http://localhost:3000/products';
 
  //Inject the HttpClient object to the constructor
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return  this.http.get<Product[]>("http://localhost:3000/products").pipe(
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



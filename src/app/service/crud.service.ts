import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable,  } from 'rxjs';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //nodejs api
  REST_API: string = "http://localhost:8000/api";
  //set http headers
  httpHeaders = new HttpHeaders().set('Content_Type','application/json')
  constructor(private http: HttpClient) { }
  
  // add recorders
  addBook(data: any): Observable<any>{
     let API_URL = `${this.REST_API}/add-book`;
    
 return this.http.post(API_URL,data).pipe(catchError(this.handleError))
  }
  //get all bookms details
  getBooks() :Observable<any> {
    return this.http.get(`${this.REST_API}`)
  }
  //get single book
  getBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.http.get(API_URL, { headers: this.httpHeaders }).pipe(map((res: any)=> {
      return res || {}
    }),
    catchError(this.handleError))
  }
  //update book 
  updateBook(id:any,data:any):Observable<any>{
  let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.http.put(API_URL, data, { headers: this.httpHeaders }).
      pipe(catchError(this.handleError))
  }
  //delete Book
  deleteBooks(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`
    return this.http.delete(API_URL,{ headers: this.httpHeaders }).
      pipe(catchError(this.handleError))
  }



  handleError(error:HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Handle client error
      errorMessage = error.error.message
    } else {
      //Handle Server side error
      errorMessage =  `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(() => new Error(`Invalid time ${ errorMessage }`));
}
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

  constructor(private http: HttpClient) { }

  fetchNewsBySymbol(symbol: string): Observable<any> {
    const today = new Date();
    const toDate = today.toISOString().split('T')[0]; // Convert to ISO format (YYYY-MM-DD)
    const fromDate = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]; // 2 weeks ago

    const backendUrl = 'https://finnhub.io/api/v1/company-news';
    const params = new HttpParams()
        .set('symbol', symbol)
        .set('from', fromDate)
        .set('to', toDate)
        .set('token', environment.finnhubToken);

    return this.http.get(backendUrl, { params });
  }

}

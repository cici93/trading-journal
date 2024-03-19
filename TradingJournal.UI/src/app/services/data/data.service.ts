import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {stocks} from "../../../assets/mocks/stocks.mock";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // todo fetch stock data from seperate backend after each inputchange, cache and filter by input
  fetchStockData(): any[] {
  //   const exchange = "US";
  //   const marketCode = "XNAS";
  //
  //   const backendUrl = 'https://finnhub.io/api/v1/stock/symbol';
  //   const params = new HttpParams()
  //       .set('exchange', exchange)
  //       .set('mic', marketCode)
  //       .set('token', environment.finnhubToken);

    // return this.http.get(backendUrl, { params });
    return stocks;
  }


}

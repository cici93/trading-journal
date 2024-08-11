import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from "rxjs";
import { HistoricalBarDto } from "../../interfaces/rest/historical-bar-dto";
import { SymbolDto } from "../../interfaces/rest/symbol-dto";
import { StockDataDto } from "../../interfaces/rest/stock-data-dto";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }


  public getHistoricalBars(symbol: string, from: string, into: string) :Observable<HistoricalBarDto[]> {
    const queryParams = new HttpParams()
        .set('symbol', symbol)
        .set('from', from)
        .set('into', into);
    return this.http.get<HistoricalBarDto[]>(`${environment.backendUrl}/Data/bars`, { params: queryParams });
  }

  public getSymbols(search?: string): Observable<SymbolDto[]> {
    let queryParams = new HttpParams();
    if (search) {
      queryParams = queryParams.set('search', search);
    }
    return this.http.get<SymbolDto[]>(`${environment.backendUrl}/Data/symbols`, { params: queryParams });
  }

  public getStockData(symbol: string): Observable<StockDataDto> {
    const queryParams = new HttpParams()
        .set('symbol', symbol);
    return this.http.get<StockDataDto>(`${environment.backendUrl}/Data/stock`, { params: queryParams });
  }
}







  // -----------------------------------------------
  // todo fetch stock data from seperate backend after each inputchange, cache and filter by input
  // fetchStockData(): any[] {
    //   const exchange = "US";
    //   const marketCode = "XNAS";
    //
    //   const backendUrl = 'https://finnhub.io/api/v1/stock/symbol';
    //   const params = new HttpParams()
    //       .set('exchange', exchange)
    //       .set('mic', marketCode)
    //       .set('token', environment.finnhubToken);

    // return this.http.get(backendUrl, { params });
    // return stocks;
  // }


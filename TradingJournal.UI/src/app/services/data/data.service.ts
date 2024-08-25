import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, Observable } from "rxjs";
import { HistoricalBarDto } from "../../interfaces/rest/historical-bar-dto";
import { SymbolDto } from "../../interfaces/rest/symbol-dto";
import { StockDataDto } from "../../interfaces/rest/stock-data-dto";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) {
    }


    public getHistoricalBars(symbol: string, from: string, into: string): Observable<HistoricalBarDto[]> {
        const queryParams = new HttpParams()
            .set('symbol', symbol)
            .set('from', from)
            .set('into', into);
        return this.http.get<HistoricalBarDto[]>(`${environment.backendUrl}/Data/bars`, {params: queryParams});
    }

    public getSymbols(search?: string): Observable<SymbolDto[]> {
        let queryParams = new HttpParams();
        if (search) {
            queryParams = queryParams.set('search', search);
        }
        return this.http.get<SymbolDto[]>(`${environment.backendUrl}/Data/symbols`, {params: queryParams});
    }

    public getStockData(symbol: string): Observable<StockDataDto> {
        const queryParams = new HttpParams()
            .set('symbol', symbol);
        return this.http.get<StockDataDto>(`${environment.backendUrl}/Data/stock`, {params: queryParams});
    }

    // public getStockLogo(stockData: StockDataDto) {
    //
    //     const stockDataDto = { ...stockData };
    //     stockDataDto.companyName = stockDataDto.companyName?.split(" ").shift();
    //     stockDataDto.companyName = stockDataDto.companyName?.split(",").shift();
    //
    //
    //     const url = 'https://api.api-ninjas.com/v1/logo';
    //     const queryParams = new HttpParams()
    //         .set('name', stockDataDto.companyName!);
    //     const headers = new HttpHeaders().set('X-Api-Key', 'QCWidRN5xTmPdBEmQYg47Q==rhyEQytFirjSTFQ1');
    //
    //     const res = this.http.get<any>(url, { params: queryParams, headers: headers });
    //
    //
    //     return res.pipe(
    //         map((response) => {
    //             console.log('url', url)
    //             console.log('queryParams', queryParams)
    //             console.log('headers', headers)
    //
    //
    //             console.log('response', response)
    //             const matchingCompany = response.find((val: { ticker: string | undefined; }) => val.ticker === stockDataDto.ticker);
    //             return matchingCompany ? matchingCompany.image : null;
    //         })
    //     );
    // }
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


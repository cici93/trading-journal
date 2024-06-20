import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { catchError, debounceTime, map, Observable, of, switchMap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BackendService {
    backendUrl = environment.backendUrl;
    constructor(private http: HttpClient) {
    }

    get <T> (api: string): Observable<T> {
        return this.http.get<T>(`${this.backendUrl}${api}`);
    }

    post <T> (api: string, body: T): Observable<T> {
       return this.http.post<T>(`${this.backendUrl}${api}`, body);
    }

    delete <T> (api: string): Observable<T> {
        return this.http.delete<T>(`${this.backendUrl}${api}`);
    }


    randomUserUrl = 'https://api.randomuser.me/?results=5';

    getRandomUser() {
        /* eslint-disable @typescript-eslint/no-explicit-any */
       return (name: string): Observable<any> =>
            this.http
                .get(`${this.randomUserUrl}`)
                .pipe(
                    catchError(() => of({results: []})),
                    map((res: any) => res.results)
                )
                .pipe(map((list: any) => list.map((item: any) => `${item.name.first} ${name}`)));

    }

    getCompanys() {
        return (name: string): Observable<any> => {
            const companyNames: string[] = [
                'All',
                'Apfel',
                'Birne',
                'Apple',
                'Nvidia'
            ];
            return of(companyNames);
        };
    }
}

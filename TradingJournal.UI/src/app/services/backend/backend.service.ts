import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs";

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

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


export type SynonymsResponse = {
    word: string,
    synonyms: string[]
}

@Injectable({
    providedIn: 'root',
})
export class SynonymsService {
    private static readonly URL = "http://localhost:3030/api/synonyms";

    constructor(private httpClient: HttpClient) { }

    public getService(word: string): Observable<SynonymsResponse> {
        return this
            .httpClient
            .get<SynonymsResponse>(`${SynonymsService.URL}/${word}`);
    }

    public patchService(word: string, synonyms: string[]): Observable<SynonymsResponse> {
        return this
            .httpClient
            .patch<SynonymsResponse>(`${SynonymsService.URL}/${word}`, { synonyms });
    }

    public postService(word: string, synonyms: string[]): Observable<SynonymsResponse> {
        return this
            .httpClient
            .post<SynonymsResponse>(`${SynonymsService.URL}`, { word, synonyms });
    }

    public deleteService(word: string): Observable<SynonymsResponse> {
        return this
            .httpClient
            .delete<SynonymsResponse>(`${SynonymsService.URL}/${word}`);
    }
}
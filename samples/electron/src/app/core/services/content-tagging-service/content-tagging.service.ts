/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { GetContextTagsRequest } from '../../models/get-context-tags-request';
import { GetContextTagsResponse } from '../../models/get-context-tags-response';
import { SearchByTagRequest } from '../../models/search-by-tag-request';
import { SearchByTagResponse } from '../../models/search-by-tag-response';

@Injectable({
  providedIn: 'root'
})
export class ContentTaggingService {
  private baseUrl = `https://imola-prod-api-2c3f1a34.azurewebsites.net/api`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: ``
    })
  };

  constructor(private http: HttpClient) { }

  postGetContextTags(rule: GetContextTagsRequest, token: string): Observable<GetContextTagsResponse> {
    this.httpOptions.headers = this.httpOptions.headers.set(`Authorization`, `Bearer ${token}`);

    return this.http.post<GetContextTagsResponse>(`${this.baseUrl}/RulesAPI/matches`, rule, this.httpOptions).pipe(take(1));
  }
  
  searchByTag(tag: SearchByTagRequest, token: string): Observable<SearchByTagResponse> {
    this.httpOptions.headers = this.httpOptions.headers.set(`Authorization`, `Bearer ${token}`);

    return this.http.post<SearchByTagResponse>(`${this.baseUrl}/SearchAPI/searchbytag`, tag, this.httpOptions).pipe(take(1));
  }
}

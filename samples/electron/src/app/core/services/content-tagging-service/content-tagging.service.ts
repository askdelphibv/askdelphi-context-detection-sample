/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rule } from '../../models/rule';
import { Tag } from '../../models/tag';

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

  postRule(rule: Rule, token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set(`Authorization`, `Bearer ${token}`);

    return this.http.post<Rule>(`${this.baseUrl}/RulesAPI/matches`, rule, this.httpOptions);
  }
  
  getTopicByTag(tag: Tag, token: string): Observable<any> {
    this.httpOptions.headers = this.httpOptions.headers.set(`Authorization`, `Bearer ${token}`);

    return this.http.post<Tag>(`${this.baseUrl}/SearchAPI/searchbytag`, tag, this.httpOptions);
  }
}

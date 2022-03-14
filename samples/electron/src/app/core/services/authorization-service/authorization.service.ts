import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private baseUrl = `https://imola-prod-api-2c3f1a34.azurewebsites.net/api/TokenAPI`;

  constructor(private http: HttpClient) { }

  getTokenUrl(publicationGuid: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/tokenurl?publicationGuid=${publicationGuid}`).pipe(take(1));
  }

  getRefreshToken(token: string, refreshToken: string, publicationGuid: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/refresh?token=${token}refreshToken=${refreshToken}&publicationGuid=${publicationGuid}`).pipe(take(1));
  }
}

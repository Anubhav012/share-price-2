// earnings.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EarningsService {
  private apiUrl = 'https://www.alphavantage.co/query';
  private apiKey = ' 89e51aee9a31611d0fc78a90a30ea053';

  constructor(private http: HttpClient) { }

  getEarnings(symbol: string): Observable<any> {
    const params = {
      function: 'EARNINGS',
      symbol: symbol,
      apikey: this.apiKey
    };

    return this.http.get(this.apiUrl, { params });
  }
}

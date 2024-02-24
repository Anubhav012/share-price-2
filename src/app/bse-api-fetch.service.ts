// nse-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NseDataService {
  private apiUrl = 'https://www.nseindia.com/api/event-calendar';

  constructor(private http: HttpClient) { }

  fetchData(startDate: string, endDate: string): Observable<any> {
    // Headers similar to the cURL command
    const headers = new HttpHeaders({
      'authority': 'www.nseindia.com',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
    });

    // Params for the request
    const params = new HttpParams()
      .set('index', 'equities')
      .set('from_date', startDate)
      .set('to_date', endDate);

    return this.http.get(this.apiUrl, { headers, params });
  }
}

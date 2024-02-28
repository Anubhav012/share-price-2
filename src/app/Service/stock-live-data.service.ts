import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { DbRequestService } from './db-request.service';

@Injectable({
  providedIn: 'root'
})
export class StockLiveDataService {

  private apiUrl = 'https://eodhd.com/api/real-time/';
  private apiToken = '65d47ab76b4555.70028728';
  private stockSymbols: string[] = []; 

  constructor(private http: HttpClient,
    private dbRequestService: DbRequestService) {}

    existingData$ = this.dbRequestService.fetchData();

  // Fetch real-time stock data for a given symbol
  getStockData(symbol: string): Observable<any> {
    const url = `${this.apiUrl}${symbol}?filter=close&api_token=${this.apiToken}&fmt=json`;
    return this.http.get(url);
  }

  // Fetch real-time data for all stocks in the array
  getAllStockData(): Observable<any[]> {
    const requests = this.stockSymbols.map(symbol => this.getStockData(symbol));

    // Use switchMap to handle multiple concurrent HTTP requests
    return interval(300000) // Refresh every 5 minutes (300,000 milliseconds)
      .pipe(
        switchMap(() => {
          return this.http.get<any[]>(`${this.apiUrl}all?filter=close&api_token=${this.apiToken}&fmt=json`);
        })
      );
  }
}

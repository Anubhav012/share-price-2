import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { DbRequestService } from './db-request.service';
import { DividendInfo } from '../earning-released/divident-released/dividend-info.model';

@Injectable({
  providedIn: 'root'
})
export class StockLiveDataService {

  private apiUrl = 'https://eodhd.com/api/real-time/';
  private apiToken = '65d47ab76b4555.70028728';
  private stockSymbols: string[] = []; 
  private symbolsArray: string[] = []; 

  constructor(private http: HttpClient,
    private dbRequestService: DbRequestService) {}

    getStockName() {
      this.dbRequestService.fetchData()
        .subscribe(
          Response => {
            console.log('Response - ', Response[0]);
            this.stockSymbols = Response.flatMap(item =>
              Object.values(item)
                .map(subItem => ({
                  symbol: subItem.symbol,
                  date: subItem.date
                }))
                .filter(subItem => {
                  const subItemDate = new Date(subItem.date);
                  const currentDate = new Date();
                  const twoDaysAgo = new Date();
                  twoDaysAgo.setDate(currentDate.getDate() - 2);
                  const thirtyDaysAhead = new Date();
                  thirtyDaysAhead.setDate(currentDate.getDate() + 30);
                  return subItemDate >= twoDaysAgo && subItemDate <= thirtyDaysAhead;
                })
                .filter(subItem => subItem.symbol.endsWith('.NS'))
                .map(subItem => subItem.symbol)
            ).filter(symbol => !!symbol);
    
            console.log('this.stockSymbols - ', this.stockSymbols);
          }
        );
      }

  // Fetch real-time stock data for a given symbol
  getStockData(symbol: string): Observable<any> {
    const url = `${this.apiUrl}${this.symbolsArray}?filter=close&api_token=${this.apiToken}&fmt=json`;
    console.log(url);
    return this.http.get(url);
  }

  // Fetch real-time data for all stocks in the array
  getAllStockData(): Observable<any[]> {
    this.getStockName();
    const requests = this.stockSymbols.map(symbol => {
      // Check if symbol ends with '.NS'
      if (symbol.endsWith('.NS')) {
        // Replace '.NS' with '.NSE'
        symbol = symbol.replace('.NS', '.NSE');
        if(symbol.includes('.NSE'))
        this.symbolsArray.push(symbol);
        

      console.log('symbols array - ',this.symbolsArray);
      }
    
      // Call your function (e.g., getStockData) with the modified symbol
      return this.getStockData(symbol);
    });
    // Use switchMap to handle multiple concurrent HTTP requests
    return interval(3600000) // Refresh every 60 minute (3600000 milliseconds)
      .pipe(
        switchMap(() => {
          return this.http.get<any[]>(`${this.apiUrl}all?filter=close&api_token=${this.apiToken}&fmt=json`);
        })
      );
  }
}

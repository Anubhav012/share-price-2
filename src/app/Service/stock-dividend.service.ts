// stock-dividend.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockDividendService {
  private apiUrl = 'https://fmpcloud.io/api/v3/stock_dividend_calendar';
  private apiKey = '89e51aee9a31611d0fc78a90a30ea053';

  private dividendsSubject = new BehaviorSubject<any[]>([]);
  dividends$ = this.dividendsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getStockDividends(startDate: string, endDate: string): Observable<any> {
    const url = `${this.apiUrl}?from=${startDate}&to=${endDate}&apikey=${this.apiKey}`;
    this.http.get(url).subscribe(data => {
      const filteredData = this.filterBySymbols(data);
      this.dividendsSubject.next(filteredData);
    });

    return this.dividends$;
  }

  private filterBySymbols(data: any): any[] {
    console.log(data);
    console.log(data.filter((item: any) => item.symbol.includes('.NS') || item.symbol.includes('.BO')));
    return data.filter((item: any) => item.symbol.includes('.NS') || item.symbol.includes('.BO'));
  }
}

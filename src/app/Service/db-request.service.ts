import { Injectable } from '@angular/core';
import { StockDividendService } from './stock-dividend.service';
import { HttpClient } from '@angular/common/http';
import { DividendInfo } from '../earning-released/divident-released/dividend-info.model';
import { Observable, catchError, forkJoin, map, of, switchMap, tap, throwError } from 'rxjs';
import { DividentInfoComponent } from '../earning-released/divident-info/divident-info.component';

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  public fetchDataa: DividendInfo[]=[];
  constructor(private stockDividendService: StockDividendService,private http: HttpClient) { }
  

  fetchData(): Observable<DividendInfo[]> {
    return this.http.get<DividendInfo[]>('https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json')
      .pipe(
        map(responseData => {
          const postArray = [];
          for (const dynamicKey in responseData) {
            postArray.push({ ...responseData[dynamicKey], id: dynamicKey });
          }
          console.log('PostArray - ', postArray);

          this.fetchDataa = postArray;
          console.log('this.fetchDataa - ', this.fetchDataa);

          return postArray as DividendInfo[];
        })
      );
  }

postDividendData(dividend: DividendInfo[]): Observable<any> {
  const existingData$ = this.fetchData();
console.log('existing data - ',this.fetchData());
  return existingData$.pipe(
    switchMap((existingData: DividendInfo[]) => {
      const uniqueData = dividend.filter(newDividend =>
        !existingData.some(existingData => this.isSameDividend(newDividend, existingData))
      );

      // If there are unique dividends, send them to the database
      if (uniqueData.length > 0) {
        const requests = uniqueData.map(newDividend =>
          this.http.post('https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json', newDividend)
        );
        return forkJoin(requests);
      } else {
        // If no unique dividends, return an empty observable
        return of([]);
      }
    })
  );
}
 


  private isSameDividend(newDividend: DividendInfo, existingDividend: DividendInfo): boolean {
    // Customize this function based on how you define equality between two dividends
    return newDividend.symbol === existingDividend.symbol
      && newDividend.date === existingDividend.date
      // Add other conditions as needed
  }
}

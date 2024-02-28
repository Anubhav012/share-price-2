// earning-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EarningApiService } from './earning-api.service';

@Injectable({
  providedIn: 'root',
})
export class EarningDataService {
  private apiUrl =
    'https://fmpcloud.io/api/v3/earning_calendar?apikey=89e51aee9a31611d0fc78a90a30ea053';

  constructor(private http: HttpClient) {}

  getEarningData(): Observable<any> {
    return this.http.get(this.apiUrl);
    // this.earningCalendar.postEarningData();
  }

  filterAndStoreData(data: any[]): any[] {
    const filteredData = data.filter((item) => {
      const symbol = item.symbol;
      return symbol.includes('.NS') || symbol.includes('.BO');
    });

    const sortedData = filteredData.sort((a, b) => {
      // Prefer .NS over .BO
      if (a.symbol.includes('.NS') && !b.symbol.includes('.NS')) {
        return -1;
      } else if (!a.symbol.includes('.NS') && b.symbol.includes('.NS')) {
        return 1;
      } else {
        return 0;
      }
    });

    // Remove ".NS" and ".BO" from the symbols if present
    const sanitizedData = sortedData.map((item) => {
      item.symbol = item.symbol.replace('.NS', '').replace('.BO', '');
      return item;
    });

    // You can store the sanitizedData in the desired data structure or perform any other actions.
    // For example, if you want to store it in a property of the service:
    // this.storedData = sanitizedData;

    return sanitizedData;
  }
}

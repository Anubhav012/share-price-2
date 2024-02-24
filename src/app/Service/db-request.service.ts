import { Injectable } from '@angular/core';
import { StockDividendService } from './stock-dividend.service';
import { HttpClient } from '@angular/common/http';
import { DividendInfo } from '../earning-released/divident-released/dividend-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbRequestService {

  constructor(private stockDividendService: StockDividendService,private http: HttpClient) { }
  

  fetchData(): Observable<DividendInfo[]> {
    return this.http.get<DividendInfo[]>('https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json');
  }

 postDividendData(dividend: DividendInfo[]){
  const exisitingData=this.fetchData();
       this.http.post('https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json', dividend).subscribe(
      response => {
        this.fetchDividendData
        console.log('Data posted successfully:', response);
        // You can perform any additional actions if needed
      },
      error => {
        console.error('Error posting data:', error);
        // You can perform any additional error handling if needed
      }
    );;
  }

  fetchDividendData(startDate: string, endDate: string): Observable<DividendInfo[]> {
    return this.http.get<DividendInfo[]>('https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json');
    // .subscribe(
    //   (data) => {
    //     // Handle the fetched data as needed
    //     console.log('Data fetched from DB:', data);
    //     // Send the fetched data back to the parent component
    //     this.dividentData.emit(data);
    //   },
    //   (error) => {
    //     console.error('Error fetching data from DB:', error);
    //     // Handle the error or notify the user as needed
    //   }
    // );
  }
}

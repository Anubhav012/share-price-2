import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EarningDataService } from './earning-released.service';
import { EarningCalendar } from '../earning-released/earningCalendar.model';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EarningApiService {
  private baseUrl = 'https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/earningReocords';
  constructor(private http: HttpClient,
    private earningDataService: EarningDataService) { }


    getCurrentQuarterAndYear(): string {
      const currentDate = new Date();
      let currentQuarter: string;
      let yearOfQuarter: number;
  
      if (currentDate.getMonth() >= 3 && currentDate.getMonth() <= 5) {
          currentQuarter = 'Q1';
      } else if (currentDate.getMonth() >= 6 && currentDate.getMonth() <= 8) {
          currentQuarter = 'Q2';
      } else if (currentDate.getMonth() >= 9 && currentDate.getMonth() <= 11) {
          currentQuarter = 'Q3';
      } else {
          currentQuarter = 'Q4';
      }
  
      // Check if it's Q4 and before April 1st
      if (currentQuarter === 'Q4' && currentDate.getMonth() === 0 && currentDate.getDate() < 1) {
          currentQuarter = 'Q1';
          yearOfQuarter = currentDate.getFullYear() - 1;
      } else {
          yearOfQuarter = currentQuarter !== 'Q1' ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
      }
  
      return `${yearOfQuarter}/${currentQuarter}`;
  }




  postEarningData(earningCalendar: EarningCalendar[]): Observable<any> {
    const url = `${this.baseUrl}/${this.getCurrentQuarterAndYear()}.json`;
    console.log('post earning URL - ', url);
  
    return this.http.get(url).pipe(
      switchMap((existingData: any) => {
        if (existingData) {
          const existingDataId = Object.keys(existingData)[0];
          console.log('Updating existing data with ID:', existingDataId);
          return this.http.put(`${this.baseUrl}/${this.getCurrentQuarterAndYear()}/${existingDataId}.json`, earningCalendar);
        } else {
          console.log('Creating new data');
          return this.http.post(url, earningCalendar);
        }
      })
    );
  }
  

 // fetchDividendData(): Observable<DividendInfo[]> {
   
 //   return this.http.get<any>(`https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json`)
 //     // .pipe(
 //     //   map(response => {
 //     //     const dynamicKey = Object.keys(response)[0]; // Get the dynamic key
 //     //     const dataArray = response[dynamicKey] || []; // Access the array using the dynamic key, handle potential null
 //     //     console.log('dataArray -', dataArray);
 //     //     this.fetchDataa = dataArray;
 //     //     return dataArray as DividendInfo[]; // Return the array with the expected type
 //     //   })
 //     // );
 // }

//  private isSameDividend(newDividend: DividendInfo, existingDividend: DividendInfo): boolean {
//    // Customize this function based on how you define equality between two dividends
//    return newDividend.symbol === existingDividend.symbol
//      && newDividend.date === existingDividend.date
//      // Add other conditions as needed
//  }
}

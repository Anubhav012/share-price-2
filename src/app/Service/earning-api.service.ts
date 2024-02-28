import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EarningDataService } from './earning-released.service';
import { EarningCalendar } from '../earning-released/earningCalendar.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EarningApiService {
  private baseUrl = 'https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app';
  constructor(private http: HttpClient,
    private earningDataService: EarningDataService) { }


  getCurrentQuarterAndYear(): string {
    const currentDate = new Date();
    let currentQuarter: string;
    let yearOfQuarter: number;
  
    if (currentDate.getMonth() >= 0 && currentDate.getMonth() <= 2) {
      currentQuarter = 'Q1';
    } else if (currentDate.getMonth() >= 3 && currentDate.getMonth() <= 5) {
      currentQuarter = 'Q2';
    } else if (currentDate.getMonth() >= 6 && currentDate.getMonth() <= 8) {
      currentQuarter = 'Q3';
    } else {
      currentQuarter = 'Q4';
    }
  
    yearOfQuarter = currentQuarter !== 'Q4' ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
  
    return `${currentQuarter}/${yearOfQuarter}`;
  }


//   fetchData() {
//     this.http.get('https://shareprice-183e4-default-rtdb.asia-southeast1.firebasedatabase.app/DividendsData.json')
//     .pipe(map(resposneData=>{
//      // const dynamicKey = Object.keys(resposneData)[0] as keyof typeof resposneData; // Explicitly type dynamicKey
//      const postArray=[];
//      for(const dynamicKey in resposneData){
//        postArray.push({...resposneData[dynamicKey],id:dynamicKey});
//        // postArray.push({...resposneData[dynamicKey]);
//      }
//      console.log('PostArray - ',postArray);
//      return postArray as DividendInfo[];
//     }))
//     .subscribe(
//      Response=> {
//        console.log('Response - ', Response[0]);
//        this.fetchDataa=Response;
//        console.log('this.fetchDataa - ', this.fetchDataa);

//      }
//      );
//  }

postEarningData(earningCalendar: EarningCalendar[]): Observable<any> {
  const url = `${this.baseUrl}/${this.getCurrentQuarterAndYear()}.json`;
  console.log('psot earning URL - ',url);
  return this.http.post(url, earningCalendar);
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

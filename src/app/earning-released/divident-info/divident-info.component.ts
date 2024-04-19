import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NSETopGainerService } from 'src/app/Express-Service/nse-top-gainer.service';
import { DbRequestService } from 'src/app/Service/db-request.service';
import { DividendInfo } from '../divident-released/dividend-info.model';

@Component({
  selector: 'app-divident-info',
  templateUrl: './divident-info.component.html',
  styleUrls: ['./divident-info.component.css']
})
export class DividentInfoComponent implements OnInit {
@Input() divident: any[] = [];
         dividendPrice: any[] = [];
         private stockSymbols: string[] = []; 
         private symbolsArray: string[] = [];
         count=0;
         companyData: { companyName: string, [key: string]: any, differencePercent: number }[] = [];


  constructor(private NSETopGainerService:NSETopGainerService, private dbRequestService:DbRequestService) { }



  ngOnInit(): void {
    // this.getStockName();
  }

  get dividents(): any {
    const value = this.divident;
    if(value.length>1){
      this.count=this.count+1;
      if(this.count==1){
      
      const symbolsArray=value.map(item => item.symbol);
      this.sendDataToServer(symbolsArray);
    }}
      console.log('dividendPrice -',this.dividendPrice);
      console.log('vlaue -', value);
      if(this.dividendPrice.length==value.length)
      {
        console.log('symbol found after - ',this.dividendPrice.map(item => item.symbol));

        this.dividendPrice.forEach(dividendItem => {
          // Find the corresponding item in 'value' array with the same symbol
          const matchingItemIndex = value.findIndex(item => item.symbol === dividendItem.symbol);
          
          // If a matching item is found, update its properties with dividendItem
          if (matchingItemIndex !== -1) {
              value[matchingItemIndex].ltp = dividendItem.ltp;
              // You can update other properties similarly if needed
          }
      });
        value.map(item => item.symbol)
      }
      console.log('value after - ',value);
    return value;
}
  
  
  

sendDataToServer(data: string[]): void {
  // Split symbols into chunks of 20 symbols each
  for (let i = 0; i < data.length; i += 20) {
    const symbolsChunk = data.slice(i, i + 20);
    const symbolsParam = symbolsChunk.join(',');
    console.log('symbolsParam - ', symbolsParam);
    
    this.NSETopGainerService.fetchDividends(symbolsParam).subscribe(
      (response: any) => {
        console.log('Received data from server:', response);
        // Assuming this.dividendPrice is an array to store all dividend prices
        // Concatenate the received response with existing dividend prices
        this.dividendPrice = this.dividendPrice.concat(response);
      },
      error => {
        console.error('Error sending data to server:', error);
      }
    );
  }
}


  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortColumn: string = 'dividend';
  isToday(recordDate: string): boolean {
    const today = new Date();
    const formattedToday = formatDate(today, 'yyyy-MM-dd', 'en-US');
    return recordDate === formattedToday;
  }

  sortDividends(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = -this.sortDirection; // Change direction if same column is clicked again
    } else {
      this.sortColumn = column;
      this.sortDirection = 1; // Default to ascending when a new column is clicked
    }

    this.divident.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return -this.sortDirection;
      } else if (aValue > bValue) {
        return this.sortDirection;
      } else {
        return 0;
      }
    });
  }
}
import { formatDate } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NSETopGainerService } from 'src/app/Express-Service/nse-top-gainer.service';
import { DbRequestService } from 'src/app/Service/db-request.service';
import { DividendInfo } from '../divident-released/dividend-info.model';

@Component({
  selector: 'app-divident-info',
  templateUrl: './divident-info.component.html',
  styleUrls: ['./divident-info.component.css']
})
export class DividentInfoComponent implements OnInit {
@Input() divident: DividendInfo[] = [];
@Input() showStickyNote!:boolean;
         dividendPrice: any[] = [];
         private stockSymbols: string[] = []; 
         private symbolsArray: string[] = [];
         count=0;
         dividentDetails: DividendInfo[] = [];
        //  showStickyNote: boolean = true; // Or false depending on your initial condition
         companyData: { companyName: string, [key: string]: any, differencePercent: number }[] = [];


  constructor(private NSETopGainerService:NSETopGainerService, private dbRequestService:DbRequestService) { }

// Function to check if dividend percentage is greater than 2%
isDividendGreaterThan2Percent(dividend: DividendInfo): boolean {
  const today = new Date();
  const recordDate = new Date(dividend.recordDate);
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(today.getDate() - 2);
  

  // Check if the record date is within the last 2 days
  if (recordDate >= twoDaysAgo) {
    const percentage = (dividend.dividend / dividend.ltp) * 100;
    return percentage > 2; // Return true if the dividend percentage is greater than 2%
  }

  return false;
}

    // Property to store the number of dividends greater than 2%
    numberOfDividendsGreaterThan2Percent: DividendInfo[] = [];


  ngOnInit(): void {

   
  }
    // this.getStockName();

  // HostListener to handle clicks outside the sticky note
  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   const stickyNoteElement = document.querySelector('.sticky-note');
  //   if (stickyNoteElement && !stickyNoteElement.contains(event.target as Node)) {
  //     this.showStickyNote = true; // Hide sticky note if click is outside it
  //   }
  // }
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
      console.log('dividendPrice Length -',this.dividendPrice.length);
      if(this.dividendPrice.length>0)
      {
        console.log('symbol found after - ',this.dividendPrice.map(item => item.symbol));

        this.dividendPrice.forEach(dividendItem => {
          // Find the corresponding item in 'value' array with the same symbol
          const matchingItemIndex = value.findIndex(item => item.symbol === dividendItem.symbol);
          
          // If a matching item is found, update its properties with dividendItem
          if (matchingItemIndex !== -1) {
              value[matchingItemIndex].ltp = dividendItem.pricecurrent;
              // value[matchingItemIndex].mnRange = dividendItem.mnRange;
              value[matchingItemIndex].close = dividendItem.priceprevclose;
              value[matchingItemIndex].wkRange = dividendItem.pricecurrent - dividendItem.cl1wChange;
              value[matchingItemIndex].mnRange = dividendItem.pricecurrent - dividendItem.cl1mChange;
              value[matchingItemIndex].wkChange = dividendItem.cl1wPerChange;
              value[matchingItemIndex].mnChange = dividendItem.cl1mPerChange;
              value[matchingItemIndex].dyChange = dividendItem.pricepercentchange;
              // You can update other properties similarly if needed
          }
      });
        value.map(item => item.symbol)
      }
      console.log('value after - ',value);
      if(value[0].ltp){
        this.dividentDetails=value;

        // Calculate the number of dividends greater than 2% during component initialization
        this.numberOfDividendsGreaterThan2Percent = this.dividentDetails.filter((divident: DividendInfo) => this.isDividendGreaterThan2Percent(divident));
        console.log("this.numberOfDividendsGreaterThan2Percent  -", this.numberOfDividendsGreaterThan2Percent);
      }
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

  sortDividends(column: keyof DividendInfo): void {
    if (this.sortColumn === column) {
      this.sortDirection = -this.sortDirection; // Change direction if same column is clicked again
    } else {
      this.sortColumn = column;
      this.sortDirection = 1; // Default to ascending when a new column is clicked
    }

    this.divident.sort((a: DividendInfo, b: DividendInfo) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue !== null && bValue !== null) {
        if (aValue < bValue) {
          return -this.sortDirection;
        } else if (aValue > bValue) {
          return this.sortDirection;
        }
      }
      
      return 0;
    });
  }
}
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DividentEarningSharedService } from 'src/app/Service/divident-earning-shared.service';
import { StockDividendService } from 'src/app/Service/stock-dividend.service';
import { DividendInfo } from './dividend-info.model';
import { DbRequestService } from 'src/app/Service/db-request.service';

@Component({
  selector: 'app-divident-released',
  templateUrl: './divident-released.component.html',
  styleUrls: ['./divident-released.component.css']
})
export class DividentReleasedComponent implements OnInit {
  @Output() dividentData = new EventEmitter<DividendInfo[]>();
  public dividends: DividendInfo[] = [];
  public dividendsunSanitize: DividendInfo[] = [];


  constructor(
    private stockDividendService: StockDividendService,
    private datePipe: DatePipe,
    private dividentEarningSharedService: DividentEarningSharedService,
    private dbRequestService: DbRequestService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();

    // Calculate start date (1 month before today)
    const startDate = this.calculateDate(currentDate, -1);

    // Calculate end date (2 months from today)
    const endDate = this.calculateDate(currentDate, 2);

    const formattedStartDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(endDate, 'yyyy-MM-dd');

    // Check if formatted dates are not null before making the API call
    if (formattedStartDate && formattedEndDate) {
      this.stockDividendService
        .getStockDividends(formattedStartDate, formattedEndDate)
        .subscribe((data) => {
          this.dividendsunSanitize=data;
          console.log(this.dividendsunSanitize);
          // Remove ".NS" or ".BO" from symbols in the dividends array
          const sanitizedData = this.sanitizeSymbols(data);
          const isSymbolEqual = (obj1: DividendInfo, obj2: DividendInfo) => obj1.symbol === obj2.symbol;          
          const uniqueData = sanitizedData.filter((value, index, self) =>
            self.findIndex((obj) => isSymbolEqual(obj, value)) === index);
          this.dividends = uniqueData;
          console.log("Divident",+this.dividends);
          console.log(this.dividends);
          this.dbRequestService.postDividendData(this.dividends);
          // Send sanitized data to dividentEarningSharedService
          this.dividentEarningSharedService.sendChildData(this.dividends);
          this.dividentData.emit(this.dividends);
        });
    } else {
      console.error('Error: Formatted dates are null.');
      // Handle the error or notify the user as needed
    }
  }

  private calculateDate(baseDate: Date, monthsToAdd: number): Date {
    const result = new Date(baseDate);
    result.setMonth(result.getMonth() + monthsToAdd);
    return result;
  }

  private sanitizeSymbols(data: any[]): any[] {
    return data.map((item) => {
      return {
        ...item,
        symbol: item.symbol.replace('.NS', '').replace('.BO', ''),
      };
    });
  }

  // private postDividendDataToDb(dividends: DividendInfo[]): void {
  //   dividends.forEach((dividend) => {
  //     this.dbRequestService.postDividendData(dividend).subscribe(
  //       response => {
  //         console.log('Data posted successfully:', response);
  //         // You can perform any additional actions if needed
  //       },
  //       error => {
  //         console.error('Error posting data:', error);
  //         // You can perform any additional error handling if needed
  //       }
  //     );
  //   });
  // }
  // fetchDividendDataFromDb(startDate: string, endDate: string): void {
  //   this.dbRequestService.fetchDividendData(startDate, endDate).subscribe(
  //     (data) => {
  //       // Handle the fetched data as needed
  //       console.log('Data fetched from DB:', data);
  //       // Send the fetched data back to the parent component
  //       this.dividentData.emit(data);
  //     },
  //     (error) => {
  //       console.error('Error fetching data from DB:', error);
  //       // Handle the error or notify the user as needed
  //     }
  //   );
  // }
}

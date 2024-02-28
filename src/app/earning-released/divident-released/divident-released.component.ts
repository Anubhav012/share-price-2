import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DividentEarningSharedService } from 'src/app/Service/divident-earning-shared.service';
import { StockDividendService } from 'src/app/Service/stock-dividend.service';
import { DividendInfo } from './dividend-info.model';
import { DbRequestService } from 'src/app/Service/db-request.service';
import { StockLiveDataService } from 'src/app/Service/stock-live-data.service';

@Component({
  selector: 'app-divident-released',
  templateUrl: './divident-released.component.html',
  styleUrls: ['./divident-released.component.css']
})
export class DividentReleasedComponent implements OnInit {
  @Output() dividentData = new EventEmitter<DividendInfo[]>();
  public dividends: DividendInfo[] = [];
  public dividendsunSanitize: DividendInfo[] = [];
  stockData: any[] = [];



  constructor(
    private stockDividendService: StockDividendService,
    private datePipe: DatePipe,
    private dividentEarningSharedService: DividentEarningSharedService,
    private dbRequestService: DbRequestService,
    private stockLiveDataService:StockLiveDataService
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
          this.dbRequestService.postDividendData(data);
          console.log('Data before - ',data);
          this.dbRequestService.fetchData()
          .subscribe(
            Response => {
              console.log('Response - ', Response[0]);
              this.dbRequestService.fetchDataa = Response;
              console.log('this.fetchDataa - ', this.dbRequestService.fetchDataa);
            }
          );
          data.push(this.dbRequestService.fetchDataa[0]);
          console.log('Data - ',data);

          // Remove ".NS" or ".BO" from symbols in the dividends array
          if(data.length>1){
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
          }
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
  refreshData(): void {
    this.stockLiveDataService.getAllStockData().subscribe(data => {
      this.stockData = data;
    });
  }


  private sanitizeSymbols(data: any[]): any[] {
    return Object.values(data).map((item) => {
      const symbol = item.symbol || ''; // Use an empty string if symbol is undefined
      if (symbol === '') {
        console.log('Undefined symbol found:', item);
      }
      return {
        ...item,
        symbol: symbol.replace('.NS', '').replace('.BO', ''),
      };
    });
  }
}  
import { Component, OnInit } from '@angular/core';
import { EarningDataService } from '../Service/earning-released.service';
import { DividentEarningSharedService } from '../Service/divident-earning-shared.service';

@Component({
  selector: 'app-earning-released',
  templateUrl: './earning-released.component.html',
  styleUrls: ['./earning-released.component.css']
})
export class EarningReleasedComponent implements OnInit {

  filteredData: any[] = [];
  public dividends: any[] = [];
  selectedDate: string = '';
  currentDate = new Date();

  startDate ='';
  endDate='';

  activeTab: string = 'today'; // Default active tab is 'Today'

  constructor(private earningDataService: EarningDataService,
    private dividentEarningSharedService: DividentEarningSharedService) {}

  ngOnInit() {
    
    this.earningDataService.getEarningData().subscribe((data) => {
      this.filteredData = this.earningDataService.filterAndStoreData(data);
      console.log(this.filteredData);

      // this.dividentEarningSharedService.childData$.subscribe((data) => {
      //   this.dividends= data;
      //   console.log(this.dividends);
      // })

    });
    
    this.onClickToday();
  }

  handleDividentData(data: any[]) {
    this.dividends = data;
    console.log('Dividends received in EarningReleasedComponent:', this.dividends);
    // Handle the received data as needed
  }
  
  onClick(tab: string) {
    this.activeTab = tab;
    switch (tab) {
      case 'today':
        this.onClickToday();
        break;
      case 'yesterday':
        this.onClickYesterday();
        break;
      case 'tomorrow':
        this.onClickTomorrow();
        break;
        case 'this-week':
          this.onClickThisWeek();
          break;
        case 'next-week':
          this.onClickNextWeek();
          break;
          case 'custom-date':
            this.onClickCustomDate();
            break;
    }
  }

  onClickToday() {
    this.selectedDate = this.currentDate.toISOString().split('T')[0];
    this.startDate = this.endDate = this.selectedDate;
    console.log(this.selectedDate );
    this.activeTab = 'today'; 
  }

  onClickYesterday() {
    this.selectedDate = this.calculateDate(this.currentDate, -1).toISOString().split('T')[0]; 
    this.startDate = this.endDate = this.selectedDate;
    console.log(this.selectedDate );
    this.activeTab = 'yesterday';
  }

  onClickTomorrow() {
    this.selectedDate = this.calculateDate(this.currentDate, 1).toISOString().split('T')[0];
    this.startDate = this.endDate = this.selectedDate;
    console.log(this.selectedDate );
    this.activeTab = 'tomorrow';
  }

  onClickThisWeek() {
    const today = this.currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const daysToAdd = 6 - today; // Calculate days remaining until Sunday
    // Set this.startDate to today
    this.startDate = this.currentDate.toISOString().split('T')[0];
    // Set this.endDate to Sunday of this week
    const sunday = this.calculateDate(this.currentDate, daysToAdd).toISOString().split('T')[0];
    this.endDate = sunday;
    this.selectedDate = this.currentDate.toISOString().split('T')[0];
    console.log(today);
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.selectedDate);
    this.activeTab = 'this-week';
  }
  
  onClickNextWeek() {
    const today = this.currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    // Calculate days remaining until the upcoming Monday
    const daysUntilMonday = 1 + ((today + 5) % 7); // 1 for Sunday, 2 for Monday, ..., 7 for Saturday
    // Set this.startDate to the upcoming Monday
    const monday = this.calculateDate(this.currentDate, daysUntilMonday).toISOString().split('T')[0];
    this.startDate = monday;
    // Calculate days remaining until the next Sunday
    const daysUntilNextSunday =  6 - today +7 +(this.isLeapYear() ? 1 : 0);  // Calculate days remaining until the next Sunday
    // Set this.endDate to the next Sunday
    const sunday = this.calculateDate(this.currentDate, daysUntilNextSunday).toISOString().split('T')[0];
    this.endDate = sunday;
    this.selectedDate = this.currentDate.toISOString().split('T')[0];
    console.log(this.startDate);
    console.log(this.endDate);
    console.log(this.selectedDate);
    this.activeTab = 'next-week';
  }
  
  
  
  
  

  onClickCustomDate(){


  }

  private calculateDate(baseDate: Date, daysToAdd: number): Date {
    const result = new Date(baseDate);
    result.setDate(result.getDate() + daysToAdd);
    return result;
  }

  private isLeapYear(): boolean {
    const year = this.currentDate.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }
}
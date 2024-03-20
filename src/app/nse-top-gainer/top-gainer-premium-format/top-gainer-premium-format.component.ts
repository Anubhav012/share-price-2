import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-gainer-premium-format',
  templateUrl: './top-gainer-premium-format.component.html',
  styleUrls: ['./top-gainer-premium-format.component.css']
})
export class TopGainerPremiumFormatComponent implements OnInit {

  @Input() companyData: any[] = [];
  constructor() { }

  ngOnInit(): void {

  }

  get companyDataLive(): any[] {
    return this.companyData.slice(); // Using slice() to return a copy of the array to prevent mutation
  }

  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortColumn: string = 'dayChangePerc'; // Default column to sort

  sortcompanyData(column: string): void {
    console.log('Sorting by column:', column);

    if (this.sortColumn === column) {
      this.sortDirection = -this.sortDirection; // Change direction if same column is clicked again
      console.log('Changing sort direction to:', this.sortDirection);
    } else {
      this.sortColumn = column;
      this.sortDirection = 1; // Default to ascending when a new column is clicked
      console.log('New sort column:', this.sortColumn);
    }

    this.companyData.sort((a, b) => {
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

    console.log('Sorted company data:', this.companyData);
  }
}


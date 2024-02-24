import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divident-info',
  templateUrl: './divident-info.component.html',
  styleUrls: ['./divident-info.component.css']
})
export class DividentInfoComponent implements OnInit {
@Input() divident: any[] = [];
  constructor() { }



  ngOnInit(): void {
  }

  get dividents(): any{
    return this.divident
  }

  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortColumn: string = 'dividend';

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

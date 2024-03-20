import { Component, OnInit } from '@angular/core';
import { NSETopGainerService } from '../Express-Service/nse-top-gainer.service';

@Component({
  selector: 'app-nse-top-gainer',
  templateUrl: './nse-top-gainer.component.html',
  styleUrls: ['./nse-top-gainer.component.css']
})
export class NSETopGainerComponent implements OnInit {
  companyData: { companyName: string, [key: string]: any, differencePercent: number }[] = [];
  selectedView: string = 'tableView'; // Default selected view

  constructor(private dataService: NSETopGainerService) { }

  ngOnInit(): void {
    this.dataService.fetchData().subscribe(
      (data: any) => {
        // Calculate difference percentage for each company
        this.companyData = Object.entries(data).map(([companyName, companyData]) => {
          return { companyName, ...(companyData as any), differencePercent: this.calculateDifferencePercent(companyData as any) };
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  // Method to calculate the difference percentage
  calculateDifferencePercent(companyData: any): number {
    const buyQty = companyData.totalBuyQty;
    const sellQty = companyData.totalSellQty;
    if (sellQty === 0) return 100; // Avoid division by zero
    return parseFloat(((buyQty - sellQty) / sellQty * 100).toFixed(2));
  }

  // Method to toggle between table view and premium view
  toggleView(): void {
    // No need to implement any logic here as the ngModel will automatically update the selectedView property
  }
}

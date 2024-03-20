import { Component, OnInit } from '@angular/core';
import { NSETopGainerService } from '../Express-Service/nse-top-gainer.service';

@Component({
  selector: 'app-nse-top-gainer',
  templateUrl: './nse-top-gainer.component.html',
  styleUrls: ['./nse-top-gainer.component.css']
})
export class NSETopGainerComponent implements OnInit {
  data: any;
  fetchedData: any[] = [];
  companyCodes: any;

  constructor(private nseTopGainerService: NSETopGainerService) {}

  ngOnInit(): void {
    this.fetchCompanyCodes();
  }

  fetchCompanyCodes(): void {
    this.nseTopGainerService.fetchCompanyCodes().subscribe((response) => {
      this.companyCodes = response;
      console.log('Company Codes:', this.companyCodes);
    });
  }
}

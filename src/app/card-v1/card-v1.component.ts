import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-v1',
  templateUrl: './card-v1.component.html',
  styleUrls: ['./card-v1.component.css']
})
export class CardV1Component implements OnInit {
  @Input() companyData: any = {}; // Input property to receive company data

  constructor() { }

  ngOnInit(): void {
  }

}

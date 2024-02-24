import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() date: string = 'No date available';
  @Input() currency: string = '';
  @Input() companyName: string = 'Demo';
  @Input() price: any = 'Not Available';
  @Input() priceChange: number = 0;
  @Input() revenueQ3FY23: string = '';
  @Input() revenueDec23: string = '';
  @Input() revenueGrowth: number = 0;
  @Input() grossProfitQ3FY23: string = '';
  @Input() grossProfitDec23: string = '';
  @Input() grossProfitGrowth: number = 0;
  @Input() netProfitQ3FY23: string = '';
  @Input() netProfitDec23: string = '';
  @Input() netProfitGrowth: number = 0;
  @Input() earningsType: string = '';
  @Input() Divident: string= 'Not Available';
  @Input() RecordDate: string='Not Available';
  @Input() ExDate: string='Not Available';
  @Input() PayDate: string='Not Available';

  public displayDividentDate:boolean = false;

  displayDate() {
    this.displayDividentDate = true;
  }
}

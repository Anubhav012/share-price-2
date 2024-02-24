import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  amount: string = 'Rs.Cr.';
  changePercentage: string = '-3.67%';
  revenue: any = { current: 24, previous: 23, growth: '4%' };
  grossProfit: any = { current: 4, previous: 2, growth: '100%' };
  netProfit: any = { current: 3, previous: 2, growth: '50%' };
}

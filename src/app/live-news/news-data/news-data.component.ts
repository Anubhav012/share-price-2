import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-data',
  templateUrl: './news-data.component.html',
  styleUrls: ['./news-data.component.css']
})
export class NewsDataComponent implements OnInit {
  public short_stock_info:Boolean = false;
  public priceGain:Boolean = false;
  public priceLoss:Boolean = false;
  @Input() News: any;
  public shortStock: any;
  constructor() { }

  ngOnInit(): void {
    console.log("News - ",this.News);
    this.shortStock=this.News.shortStock[0];
    if(this.shortStock !=null){
      this.short_stock_info=true;
      if(this.shortStock.path== "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" )
       this.priceGain=true;
      else
      this.priceLoss=true;
    }

  }

}

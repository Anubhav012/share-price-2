import { Component, OnInit } from '@angular/core';
import { NSETopGainerService } from '../Express-Service/nse-top-gainer.service';

@Component({
  selector: 'app-live-news',
  templateUrl: './live-news.component.html',
  styleUrls: ['./live-news.component.css']
})
export class LiveNewsComponent implements OnInit {
  public short_stock_info:Boolean = true;
  public loading:Boolean = true;
  public priceLoss:Boolean = false;
  public WatchList:Boolean =false;
  googleNews: any[] = [];
  constructor(private nseTopGainerService:NSETopGainerService) { }

  ngOnInit(): void {
    this.nseTopGainerService.fetchNews().subscribe(
      (response: any) => {
        console.log('Received data from server:', response);
        // Assuming this.dividendPrice is an array to store all dividend prices
        // Concatenate the received response with existing dividend prices
        this.googleNews = response
        if(this.googleNews != null)
        this.loading=false;
        console.log('googleNews from server:', this.googleNews);
      },
      error => {
        console.error('Error sending data to server:', error);
      }
    );
  }

  watchlist(){
    if(!this.WatchList)
    this.WatchList=true;
  else
  this.WatchList=false;
  }
}

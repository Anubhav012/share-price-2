import { Component, OnInit } from '@angular/core';

declare var FlipDown: any; // Declare FlipDown as any to avoid TypeScript errors

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupCountdownTimer();
  }

  private setupCountdownTimer() {
    // Unix timestamp (in seconds) to count down to
    const twoDaysFromNow = (new Date().getTime() / 1000) + (86400 * 2) + 1;

    // Set up FlipDown
    const flipdown = new FlipDown(twoDaysFromNow);

    // Start the countdown
    flipdown.start();

    // Do something when the countdown ends
    flipdown.ifEnded(() => {
      console.log('The countdown has ended!');
    });

    // Toggle theme
    const interval = setInterval(() => {
      const body = document.body;
      body.classList.toggle('light-theme');
      const flipdownElement = document.getElementById('flipdown');
      if(flipdownElement){
      flipdownElement.classList.toggle('flipdown__theme-dark');
      flipdownElement.classList.toggle('flipdown__theme-light');
    }
    }, 5000);

    // Set version
    const ver = document.getElementById('ver');
    if (ver) {
      ver.innerHTML = flipdown.version;
    }
  }
}

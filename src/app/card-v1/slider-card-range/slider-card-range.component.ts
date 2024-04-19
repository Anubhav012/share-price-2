import { Component, Input, OnInit } from '@angular/core';
import { range } from 'rxjs';

@Component({
  selector: 'app-slider-card-range',
  templateUrl: './slider-card-range.component.html',
  styleUrls: ['./slider-card-range.component.css']
})
export class SliderCardRangeComponent implements OnInit {
  @Input() companyData: any = {};
  constructor() { }

  ngOnInit(): void {
    const rangeSlider = document.getElementById("rs-range-line") as HTMLInputElement;
    const rangeBullet = document.getElementById("rs-bullet") as HTMLElement;
    console.log('companyName', this.companyData);
    console.log('Price -', this.companyData.ltp);
    rangeSlider.value = this.companyData.ltp.toString(); // Ensure value is a string
    console.log('rangeBullet', rangeBullet);
    console.log('rangeSlider.value - ', rangeSlider.value);
    rangeSlider.addEventListener("input", showSliderValue);

    const lowPriceRange = this.companyData.lowPriceRange;
    console.log('lowPriceRange', lowPriceRange);

    // Define the function outside ngOnInit
    function showSliderValue() {
        rangeBullet.innerHTML = rangeSlider.value;
        console.log('rangeSlider', rangeBullet.innerHTML);
        const bulletPosition = (parseInt(rangeSlider.value) / parseInt(rangeSlider.max));
        console.log('bulletPosition -', bulletPosition);
        rangeBullet.style.left = (bulletPosition * 200) + "px";
        console.log('rangeBullet.style.left -', rangeBullet.style.left);
    }

    // Call the function initially to set the bullet position
    showSliderValue();
}
}
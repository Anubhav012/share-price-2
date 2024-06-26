import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DividendInfo } from '../divident-released/dividend-info.model';

@Component({
  selector: 'app-sticky-dividend-note',
  templateUrl: './sticky-dividend-note.component.html',
  styleUrls: ['./sticky-dividend-note.component.css']
})
export class StickyDividendNoteComponent implements OnInit {
  @ViewChild('audioStickyNoteOn') audioStickyNoteOn!: ElementRef<HTMLAudioElement>;
  @ViewChild('audioStickyNoteOff') audioStickyNoteOff!: ElementRef<HTMLAudioElement>;

  @Input() dividend: DividendInfo[]=[];
    showStickyNote: boolean = false; // Example boolean to control sticky note visibility


  constructor() { }

  ngOnInit(): void {
console.log('StickyNotedividend - ',this.dividend);
    
  }

  getFormattedValue(value: number | string | undefined): string {
    if (typeof value === 'number') {
      return value.toFixed(1);
    } else if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue.toFixed(1) + '%';
      }
    }
    return 'N/A';
  }
  

  toggleStickyNote() {
    this.showStickyNote = !this.showStickyNote; // Toggle the boolean value
  
    // Play the corresponding audio
    if (this.showStickyNote) {
      this.audioStickyNoteOn.nativeElement.load();
      this.audioStickyNoteOn.nativeElement.play();
    } else {
      this.audioStickyNoteOff.nativeElement.load();
      this.audioStickyNoteOff.nativeElement.play();
    }
  }
}

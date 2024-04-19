import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCardRangeComponent } from './slider-card-range.component';

describe('SliderCardRangeComponent', () => {
  let component: SliderCardRangeComponent;
  let fixture: ComponentFixture<SliderCardRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderCardRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderCardRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

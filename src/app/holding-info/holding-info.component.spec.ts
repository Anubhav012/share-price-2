import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingInfoComponent } from './holding-info.component';

describe('HoldingInfoComponent', () => {
  let component: HoldingInfoComponent;
  let fixture: ComponentFixture<HoldingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoldingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoldingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

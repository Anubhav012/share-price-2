import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningReleasedComponent } from './earning-released.component';

describe('EarningReleasedComponent', () => {
  let component: EarningReleasedComponent;
  let fixture: ComponentFixture<EarningReleasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarningReleasedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarningReleasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

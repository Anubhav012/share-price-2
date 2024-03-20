import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGainerPremiumFormatComponent } from './top-gainer-premium-format.component';

describe('TopGainerPremiumFormatComponent', () => {
  let component: TopGainerPremiumFormatComponent;
  let fixture: ComponentFixture<TopGainerPremiumFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopGainerPremiumFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopGainerPremiumFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

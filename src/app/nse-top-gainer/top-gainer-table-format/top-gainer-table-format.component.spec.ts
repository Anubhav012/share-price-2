import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopGainerTableFormatComponent } from './top-gainer-table-format.component';

describe('TopGainerTableFormatComponent', () => {
  let component: TopGainerTableFormatComponent;
  let fixture: ComponentFixture<TopGainerTableFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopGainerTableFormatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopGainerTableFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividentInfoComponent } from './divident-info.component';

describe('DividentInfoComponent', () => {
  let component: DividentInfoComponent;
  let fixture: ComponentFixture<DividentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

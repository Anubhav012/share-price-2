import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividentReleasedComponent } from './divident-released.component';

describe('DividentReleasedComponent', () => {
  let component: DividentReleasedComponent;
  let fixture: ComponentFixture<DividentReleasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividentReleasedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividentReleasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

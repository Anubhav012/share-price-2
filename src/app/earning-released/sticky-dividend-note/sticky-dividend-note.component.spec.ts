import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyDividendNoteComponent } from './sticky-dividend-note.component';

describe('StickyDividendNoteComponent', () => {
  let component: StickyDividendNoteComponent;
  let fixture: ComponentFixture<StickyDividendNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyDividendNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyDividendNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

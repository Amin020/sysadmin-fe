import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaModalComponent } from './text-area-modal.component';

describe('TextAreaModalComponent', () => {
  let component: TextAreaModalComponent;
  let fixture: ComponentFixture<TextAreaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAreaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

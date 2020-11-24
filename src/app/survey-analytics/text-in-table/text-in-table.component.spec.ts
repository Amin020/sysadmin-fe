import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInTableComponent } from './text-in-table.component';

describe('TextInTableComponent', () => {
  let component: TextInTableComponent;
  let fixture: ComponentFixture<TextInTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextInTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

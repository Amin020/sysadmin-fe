import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMsHomeComponent } from './uoms-home.component';

describe('UOMsHomeComponent', () => {
  let component: UOMsHomeComponent;
  let fixture: ComponentFixture<UOMsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UOMsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UOMsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UOMsListComponent } from './uoms-list.component';

describe('UOMsListComponent', () => {
  let component: UOMsListComponent;
  let fixture: ComponentFixture<UOMsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UOMsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UOMsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

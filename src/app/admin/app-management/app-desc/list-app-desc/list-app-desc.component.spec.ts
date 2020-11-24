import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppDescComponent } from './list-app-desc.component';

describe('ListAppDescComponent', () => {
  let component: ListAppDescComponent;
  let fixture: ComponentFixture<ListAppDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAppDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAppDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

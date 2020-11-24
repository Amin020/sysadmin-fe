import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesHomeComponent } from './cities-home.component';

describe('CitiesHomeComponent', () => {
  let component: CitiesHomeComponent;
  let fixture: ComponentFixture<CitiesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

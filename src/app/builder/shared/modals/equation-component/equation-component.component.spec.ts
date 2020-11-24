import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationComponentComponent } from './equation-component.component';

describe('EquationComponentComponent', () => {
  let component: EquationComponentComponent;
  let fixture: ComponentFixture<EquationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

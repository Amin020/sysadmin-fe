import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationModalComponent } from './equation-modal.component';

describe('EquationModalComponent', () => {
  let component: EquationModalComponent;
  let fixture: ComponentFixture<EquationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

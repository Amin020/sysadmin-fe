import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionComponentComponent } from './expression-component.component';

describe('ExpressionComponentComponent', () => {
  let component: ExpressionComponentComponent;
  let fixture: ComponentFixture<ExpressionComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

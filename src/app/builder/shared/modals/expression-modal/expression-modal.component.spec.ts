import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressionModalComponent } from './expression-modal.component';

describe('ExpressionModalComponent', () => {
  let component: ExpressionModalComponent;
  let fixture: ComponentFixture<ExpressionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpressionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesOptionsComponent } from './choices-options.component';

describe('ChoicesOptionsComponent', () => {
  let component: ChoicesOptionsComponent;
  let fixture: ComponentFixture<ChoicesOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

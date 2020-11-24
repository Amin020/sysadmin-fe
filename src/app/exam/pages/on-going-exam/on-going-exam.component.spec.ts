/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnGoingExamComponent } from './on-going-exam.component';

describe('OnGoingExamComponent', () => {
  let component: OnGoingExamComponent;
  let fixture: ComponentFixture<OnGoingExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnGoingExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnGoingExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

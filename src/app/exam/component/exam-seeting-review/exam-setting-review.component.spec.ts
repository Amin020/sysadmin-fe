/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ExamSettingReviewComponent } from './exam-setting-review.component';

describe('ExamSettingReviewComponent', () => {
  let component: ExamSettingReviewComponent;
  let fixture: ComponentFixture<ExamSettingReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamSettingReviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamSettingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

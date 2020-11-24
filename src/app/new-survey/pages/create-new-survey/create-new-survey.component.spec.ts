/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CreateNewSurveyComponent } from './create-new-survey.component';


describe('CreateNewSurveyComponent', () => {
  let component: CreateNewSurveyComponent;
  let fixture: ComponentFixture<CreateNewSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNewSurveyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

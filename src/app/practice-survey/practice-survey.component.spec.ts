import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSurveyComponent } from './practice-survey.component';

describe('PracticeSurveyComponent', () => {
  let component: PracticeSurveyComponent;
  let fixture: ComponentFixture<PracticeSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

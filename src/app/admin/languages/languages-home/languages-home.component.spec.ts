import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesHomeComponent } from './languages-home.component';

describe('LanguagesHomeComponent', () => {
  let component: LanguagesHomeComponent;
  let fixture: ComponentFixture<LanguagesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

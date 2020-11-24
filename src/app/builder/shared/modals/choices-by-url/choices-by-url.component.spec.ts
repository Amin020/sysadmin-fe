import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesByUrlComponent } from './choices-by-url.component';

describe('ChoicesByUrlComponent', () => {
  let component: ChoicesByUrlComponent;
  let fixture: ComponentFixture<ChoicesByUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesByUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesByUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesByUrlComponentComponent } from './choices-by-url-component.component';

describe('ChoicesByUrlComponentComponent', () => {
  let component: ChoicesByUrlComponentComponent;
  let fixture: ComponentFixture<ChoicesByUrlComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesByUrlComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesByUrlComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

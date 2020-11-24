import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesCreationComponentComponent } from './choices-creation-component.component';

describe('ChoicesCreationComponentComponent', () => {
  let component: ChoicesCreationComponentComponent;
  let fixture: ComponentFixture<ChoicesCreationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesCreationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesCreationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

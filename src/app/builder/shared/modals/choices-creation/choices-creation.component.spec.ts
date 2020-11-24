import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesCreationComponent } from './choices-creation.component';

describe('ChoicesCreationComponent', () => {
  let component: ChoicesCreationComponent;
  let fixture: ComponentFixture<ChoicesCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicesCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

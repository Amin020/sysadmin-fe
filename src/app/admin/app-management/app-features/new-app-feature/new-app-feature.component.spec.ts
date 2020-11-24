import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppFeatureComponent } from './new-app-feature.component';

describe('NewAppFeatureComponent', () => {
  let component: NewAppFeatureComponent;
  let fixture: ComponentFixture<NewAppFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBundleComponent } from './create-edit-bundle.component';

describe('CreateEditBundleComponent', () => {
  let component: CreateEditBundleComponent;
  let fixture: ComponentFixture<CreateEditBundleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditBundleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditBundleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

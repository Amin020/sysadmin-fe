import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUOMComponent } from './create-edit-uom.component';

describe('CreateEditUOMComponent', () => {
  let component: CreateEditUOMComponent;
  let fixture: ComponentFixture<CreateEditUOMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditUOMComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditUOMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

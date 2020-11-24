import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditLanguageComponent } from './create-edit-language.component';

describe('CreateEditLanguageComponent', () => {
  let component: CreateEditLanguageComponent;
  let fixture: ComponentFixture<CreateEditLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEditLanguageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

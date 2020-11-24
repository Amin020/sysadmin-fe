import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppDescComponent } from './new-app-desc.component';

describe('NewAppDescComponent', () => {
  let component: NewAppDescComponent;
  let fixture: ComponentFixture<NewAppDescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppDescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAppUomComponent } from './new-app-uom.component';

describe('NewAppUomComponent', () => {
  let component: NewAppUomComponent;
  let fixture: ComponentFixture<NewAppUomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAppUomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAppUomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

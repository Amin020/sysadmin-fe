import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiondescEditComponent } from './regiondesc-edit.component';

describe('RegiondescEditComponent', () => {
  let component: RegiondescEditComponent;
  let fixture: ComponentFixture<RegiondescEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiondescEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiondescEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

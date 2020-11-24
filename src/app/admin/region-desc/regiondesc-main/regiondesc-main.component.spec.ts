import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiondescMainComponent } from './regiondesc-main.component';

describe('RegiondescMainComponent', () => {
  let component: RegiondescMainComponent;
  let fixture: ComponentFixture<RegiondescMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiondescMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiondescMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

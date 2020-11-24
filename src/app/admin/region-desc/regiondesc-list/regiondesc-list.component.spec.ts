import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiondescListComponent } from './regiondesc-list.component';

describe('RegiondescListComponent', () => {
  let component: RegiondescListComponent;
  let fixture: ComponentFixture<RegiondescListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiondescListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiondescListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

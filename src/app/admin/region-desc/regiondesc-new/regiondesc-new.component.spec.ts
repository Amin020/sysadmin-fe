import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiondescNewComponent } from './regiondesc-new.component';

describe('RegiondescNewComponent', () => {
  let component: RegiondescNewComponent;
  let fixture: ComponentFixture<RegiondescNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegiondescNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiondescNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

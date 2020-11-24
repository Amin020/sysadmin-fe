import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsHomeComponent } from './regions-home.component';

describe('RegionsHomeComponent', () => {
  let component: RegionsHomeComponent;
  let fixture: ComponentFixture<RegionsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

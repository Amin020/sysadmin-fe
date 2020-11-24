/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageTranslateViewComponent } from './page-translate-view.component';

describe('PageTranslateViewComponent', () => {
  let component: PageTranslateViewComponent;
  let fixture: ComponentFixture<PageTranslateViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTranslateViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTranslateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

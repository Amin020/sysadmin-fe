/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupMangementComponent } from './group-mangement.component';

describe('GroupMangementComponent', () => {
  let component: GroupMangementComponent;
  let fixture: ComponentFixture<GroupMangementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMangementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

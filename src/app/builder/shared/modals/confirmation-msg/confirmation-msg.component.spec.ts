import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationMsgComponent } from './confirmation-msg.component';

describe('ConfirmationMsgComponent', () => {
  let component: ConfirmationMsgComponent;
  let fixture: ComponentFixture<ConfirmationMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

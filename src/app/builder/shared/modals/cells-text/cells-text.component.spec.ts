import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellsTextComponent } from './cells-text.component';

describe('CellsTextComponent', () => {
  let component: CellsTextComponent;
  let fixture: ComponentFixture<CellsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderToolBoxComponent } from './builder-tool-box.component';

describe('BuilderToolBoxComponent', () => {
  let component: BuilderToolBoxComponent;
  let fixture: ComponentFixture<BuilderToolBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderToolBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderToolBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderDesignerComponent } from './builder-designer.component';

describe('BuilderDesignerComponent', () => {
  let component: BuilderDesignerComponent;
  let fixture: ComponentFixture<BuilderDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderSketchPageComponent } from './builder-sketch-page.component';

describe('BuilderSketchPageComponent', () => {
  let component: BuilderSketchPageComponent;
  let fixture: ComponentFixture<BuilderSketchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderSketchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderSketchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

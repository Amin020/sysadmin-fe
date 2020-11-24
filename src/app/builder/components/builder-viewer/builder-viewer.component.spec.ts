import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderViewerComponent } from './builder-viewer.component';

describe('BuilderViewerComponent', () => {
  let component: BuilderViewerComponent;
  let fixture: ComponentFixture<BuilderViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

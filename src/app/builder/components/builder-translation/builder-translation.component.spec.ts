import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderTranslationComponent } from './builder-translation.component';

describe('BuilderTranslationComponent', () => {
  let component: BuilderTranslationComponent;
  let fixture: ComponentFixture<BuilderTranslationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderTranslationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderTestComponent } from './builder-test.component';

describe('BuilderTestComponent', () => {
  let component: BuilderTestComponent;
  let fixture: ComponentFixture<BuilderTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposingTechniquesComponent } from './composing-techniques.component';

describe('ComposingTechniquesComponent', () => {
  let component: ComposingTechniquesComponent;
  let fixture: ComponentFixture<ComposingTechniquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComposingTechniquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposingTechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

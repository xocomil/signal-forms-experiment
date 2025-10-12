import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectedInput } from './projected-input';

describe('ProjectedInput', () => {
  let component: ProjectedInput;
  let fixture: ComponentFixture<ProjectedInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectedInput],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectedInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

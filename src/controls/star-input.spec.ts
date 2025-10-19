import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarInput } from './star-input';

describe('StarInput', () => {
  let component: StarInput;
  let fixture: ComponentFixture<StarInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarInput],
    }).compileComponents();

    fixture = TestBed.createComponent(StarInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

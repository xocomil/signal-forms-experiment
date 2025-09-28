import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomNumber } from './random-number';

describe('RandomNumber', () => {
  let component: RandomNumber;
  let fixture: ComponentFixture<RandomNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(RandomNumber);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

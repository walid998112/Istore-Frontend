import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuestionComponent } from './product-question.component';

describe('ProductQuestionComponent', () => {
  let component: ProductQuestionComponent;
  let fixture: ComponentFixture<ProductQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

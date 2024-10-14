import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductuploadComponent } from './productupload.component';

describe('ProductuploadComponent', () => {
  let component: ProductuploadComponent;
  let fixture: ComponentFixture<ProductuploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductuploadComponent]
    });
    fixture = TestBed.createComponent(ProductuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

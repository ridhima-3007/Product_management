import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';
import { AllProductService } from 'src/app/Services/allproduct.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  subcategories: any[] = [];
  imagepaths = [
    '/assets/images/1.png',
    '/assets/images/2.png',
    '/assets/images/3.png',
    '/assets/images/4.png',
    '/assets/images/5.png',
    '/assets/images/6.png',
  ];

  constructor(
    private categoryservice: CategoryService,
    private allproductservice: AllProductService
  ) {}
  @Output() subcategorySelected: EventEmitter<string> = new EventEmitter();

  selectSubcategory(subcategory: string) {
    this.subcategorySelected.emit(subcategory);
  }

  ngOnInit(): void {
    this.categoryComponentInit();
  }

  categoryComponentInit() {
    this.categoryservice.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log('Error occured', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
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

  constructor(private categoryservice: CategoryService) {}

  ngOnInit(): void {
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

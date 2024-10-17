import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit{
  categories: any[] = [];
  subcategories: any[] = []

  constructor(private categoryservice:CategoryService){}

  ngOnInit(): void {

    this.categoryservice.getCategories().subscribe(
      (data)=>{
        this.categories=data;
      },
      (error)=>{
        console.log("Error occured",error)
      }
    )
  }


}

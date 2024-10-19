import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  allData: any[] = [];
  originalData: any[] = [];  

  constructor(private allproductsservice: AllProductService, private activatedroute: ActivatedRoute,private router:Router) {
    this.allproductsservice.getProducts().subscribe(
      (data) => {
        this.allData = data;
        this.originalData = data;  
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}


  getImageUrl(imagePath: string): string {
    return environment.APIURL + `/${imagePath}`;
  }

  searchMyData(data:string){
    this.allData=this.getAllProductsBySearch(data)
  }


  getAllProductsBySearch(searchTerm: string) {
    const lowerCaseTerm = searchTerm.toLowerCase();
  
    const filteredData = this.originalData.filter(prod => 
      prod.name.toLowerCase().includes(lowerCaseTerm) ||
      (prod.subcategory.toLowerCase() === lowerCaseTerm) ||
      (prod.category.toLowerCase() === lowerCaseTerm) ||
      (prod.seller.toLowerCase()==lowerCaseTerm)
    );
  
    return filteredData;
  }
  

 
//for searching with category
  onSubcategorySelected(subcategory: string) {
   this.allData=this.getProductByCategory(subcategory)
  }

  getProductByCategory(parameter:string){
    return this.originalData.filter(prod=>prod.subcategory==parameter)
  }


}

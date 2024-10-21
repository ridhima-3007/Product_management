import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allData: any[] = [];
  originalData: any[] = [];
  message='';
  showProduct={
    category:'',
    subcategory:'',
    title:'',
    prodimg:'',
    description:'',
    price:0,
    discount:0,
  }
  show_modal:boolean=false;
  

  constructor(
    private allproductsservice: AllProductService,
    private activatedroute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeInit();
  }

  displayChangePasswordModal() {
    this.show_modal = !this.show_modal;
  }

  showTitle(myProd){
    console.log(myProd)
    this.showProduct.title=myProd.name;
    this.showProduct.prodimg=myProd.coverImage;
    this.showProduct.category=myProd.category;
    this.showProduct.subcategory=myProd.subcategory;
    this.showProduct.price=myProd.price;
    this.showProduct.discount=myProd.discount  
    this.showProduct.description=myProd.description 
  }

  homeInit() {
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

  getImageUrl(imagePath: string): string {
    return environment.APIURL + `/${imagePath}`;
  }

  searchMyData(data: string) {
    this.allData = this.getAllProductsBySearch(data);
    if(this.allData.length==0){
      this.message="NO DATA FOUND";
 }
  }

  getAllProductsBySearch(searchTerm: string) {
    const lowerCaseTerm = searchTerm.toLowerCase();

    const filteredData = this.originalData.filter(
      (prod) =>
        prod.name.toLowerCase().includes(lowerCaseTerm) ||
        prod.subcategory.toLowerCase() === lowerCaseTerm ||
        prod.category.toLowerCase() === lowerCaseTerm ||
        prod.seller.toLowerCase() == lowerCaseTerm
    );

    return filteredData;
  }

  //for searching with category
  onSubcategorySelected(subcategory: string) {
    this.allData = this.getProductByCategory(subcategory);
    if(this.allData.length==0){
      this.message="NO DATA FOUND";
 }
  }

  getProductByCategory(parameter: string) {
    return this.originalData.filter((prod) => prod.subcategory == parameter);
  }

  FilterMyProducts(event: { parameter: string; basedOn: string }) {
    this.allData = this.filterON(event.parameter, event.basedOn);
    if(this.allData.length==0){
         this.message="NO DATA FOUND";
    }
  }

  filterON(filterParameter: string, filterBasedOn: string) {
    if (filterBasedOn == 'PRICE') {
      const rangeString = filterParameter;

      if (rangeString.includes('-')) {
        const [start, end] = rangeString.split('-').map(Number);

        return this.originalData.filter(
          (prod) => prod.price >= start && prod.price <= end
        );
      } else if (rangeString.includes('and above')) {
        const minPrice = parseInt(rangeString.split(' ')[0], 10);

        return this.originalData.filter((prod) => prod.price >= minPrice);
      }
    }

    if (filterBasedOn == 'SELLER') {
      return this.originalData.filter((prod) => prod.seller == filterParameter);
    }

    if (filterBasedOn == 'DISCOUNT') {
      const rangeString = filterParameter;

      const [start, end] = rangeString.split('-').map(Number);

      return this.originalData.filter(
        (prod) => prod.discount > start && prod.discount < end
      );
    }

    return [];
  }

  getDiscountedPrice(price: number, discount: number): number {
    return Math.floor(price * (discount / 100));
  }
}

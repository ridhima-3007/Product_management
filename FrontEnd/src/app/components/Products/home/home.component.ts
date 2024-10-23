import { Component, OnInit } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allData: Product[] = [];
  originalData: Product[] = [];
  message = '';
  myImagePath = '';
  count = -1;
  activeFilters = {
    price: null,
    seller: null,
    discount: null,
    category: null,
    searchTerm: null,
  };

  showProduct = {
    category: '',
    subcategory: '',
    name: '',
    coverImage: '',
    description: '',
    price: 0,
    discount: 0,
    images: [],
  };
  show_modal: boolean = false;

  constructor(
    private allproductsservice: AllProductService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.homeInit();
  }

  displayChangePasswordModal() {
    this.show_modal = !this.show_modal;
    this.count=-1;
  }
  showFullProduct(myProd) {
    this.myImagePath = myProd.coverImage;
    this.showProduct = {
      ...this.showProduct,
      ...myProd,
    };
  }

  homeInit() {
    this.allproductsservice.getProducts().subscribe(
      (data) => {
        this.allData = data;
        this.originalData = data;
      },
      (error) => {
        this.toaster.showError('', error.error?.msg);
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return environment.APIURL + `/${imagePath}`;
  }

  searchMyData(data: string) {
    this.activeFilters.searchTerm = data.toLowerCase();
    this.applyFilters();
  }

  onSubcategorySelected(subcategory: string) {
    this.activeFilters.category = subcategory;
    this.applyFilters();
  }

  FilterMyProducts(event: { parameter: string; basedOn: string }) {
    if (event.basedOn === 'PRICE') {
      this.activeFilters.price = event.parameter;
    } else if (event.basedOn === 'SELLER') {
      this.activeFilters.seller = event.parameter;
    } else if (event.basedOn === 'DISCOUNT') {
      this.activeFilters.discount = event.parameter;
    }

    this.applyFilters();
  }

  applyFilters() {
    this.allData = this.originalData;

    if (this.activeFilters.category) {
      this.allData = this.filterByCategory(
        this.allData,
        this.activeFilters.category
      );
    }

    if (this.activeFilters.searchTerm) {
      this.allData = this.filterBySearchTerm(
        this.allData,
        this.activeFilters.searchTerm
      );
    }

    if (this.activeFilters.price) {
      this.allData = this.filterByPrice(this.allData, this.activeFilters.price);
    }

    if (this.activeFilters.seller) {
      this.allData = this.filterBySeller(
        this.allData,
        this.activeFilters.seller
      );
    }

    if (this.activeFilters.discount) {
      this.allData = this.filterByDiscount(
        this.allData,
        this.activeFilters.discount
      );
    }

    if (this.allData.length === 0) {
      this.message = 'NO DATA FOUND';
    } else {
      this.message = '';
    }
  }

  // Filter by category
  filterByCategory(data: any[], category: string) {
    return data.filter((prod) => prod.subcategory === category);
  }

  // Filter by search term
  filterBySearchTerm(data: any[], searchTerm: string) {
    return data.filter(
      (prod) =>
        prod.name.toLowerCase().includes(searchTerm) ||
        prod.subcategory.toLowerCase() === searchTerm ||
        prod.category.toLowerCase() === searchTerm ||
        prod.seller.toLowerCase() === searchTerm
    );
  }

  // Filter by price range
  filterByPrice(data: any[], priceRange: string) {
    if (priceRange.includes('-')) {
      const [start, end] = priceRange.split('-').map(Number);
      return data.filter((prod) => prod.price >= start && prod.price <= end);
    } else if (priceRange.includes('and above')) {
      const minPrice = parseInt(priceRange.split(' ')[0], 10);
      return data.filter((prod) => prod.price >= minPrice);
    }
    return data;
  }

  // Filter by seller
  filterBySeller(data: any[], seller: string) {
    return data.filter((prod) => prod.seller === seller);
  }

  // Filter by discount range
  filterByDiscount(data: any[], discountRange: string) {
    const [start, end] = discountRange.split('-').map(Number);
    return data.filter(
      (prod) => prod.discount >= start && prod.discount <= end
    );
  }

  RemoveFilter(event: { parameter: string; basedOn: string }) {
    if (event.basedOn === 'PRICE') {
      this.activeFilters.price = null;
    }
    if (event.basedOn === 'SELLER') {
      this.activeFilters.seller = null;
    }
    if (event.basedOn === 'DISCOUNT') {
      this.activeFilters.discount = null;
    }

    this.applyFilters();
  }

  getDiscountedPrice(price: number, discount: number): number {
    return Math.floor(price * (discount / 100));
  }

  showNextImages(parameter) {
    if (this.count === -1 || this.count === 0) {
      console.log('count', this.count);
      this.count++;
    }
    console.log(this.count);
    this.myImagePath = parameter[this.count++];
  }

  showPreviousImages(parameter) {
    if (this.count === parameter.length) {
      this.count = this.count - 2;
    }

    console.log(this.count);
    this.myImagePath = parameter[this.count--];
    if (this.count === -1) {
      this.count++;
    }
  }

  sortLowToHigh() {
    this.originalData.sort((a, b) => a.price - b.price);
  }

  sortHighToLow() {
    this.originalData.sort((a, b) => b.price - a.price);
  }
}

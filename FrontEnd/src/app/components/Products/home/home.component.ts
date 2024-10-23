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
  message = '';
  myImagePath = '';
  count = -1;
  show_modal: boolean = false;

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

  activeFilters = {
    category: null,
    subcategory: null,
    seller: null,
    priceRange: null,
    discountRange: null,
    searchTerm: null,
  };

  currentPage = 1;
  pageSize = 10;
  totalProducts = 0;
  sortBy = '';
  order = 'asc';

  constructor(
    private allproductsservice: AllProductService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.allproductsservice
      .getProducts(
        this.currentPage,
        this.pageSize,
        this.activeFilters,
        this.sortBy,
        this.order
      )
      .subscribe(
        (data) => {
          this.allData = data.Allproducts;
          this.totalProducts = data.totalProducts;
          if (this.allData.length === 0) {
            this.message = 'NO DATA FOUND';
          } else {
            this.message = '';
          }
        },
        (error) => {
          this.toaster.showError('Error Occured', error.error?.msg);
        }
      );
  }

  onSubcategorySelected(subcategory: string) {
    this.activeFilters.subcategory = subcategory;
    console.log(this.activeFilters);
    this.fetchProducts();
  }

  searchMyData(data: string) {
    this.activeFilters.searchTerm = data.toLowerCase();
    this.fetchProducts();
  }

  sortLowToHigh() {
    this.sortBy = 'price';
    this.order = 'asc';
    this.fetchProducts();
  }

  sortHighToLow() {
    this.sortBy = 'price';
    this.order = 'desc';
    this.fetchProducts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  getImageUrl(imagePath: string): string {
    return environment.APIURL + `/${imagePath}`;
  }

  getDiscountedPrice(price: number, discount: number): number {
    return Math.floor((price * discount) / 100);
  }

  onFilter(event: { parameter: string; basedOn: string }) {
    const { parameter, basedOn } = event;

    switch (basedOn) {
      case 'PRICE':
        this.activeFilters.priceRange = parameter;
        break;
      case 'SELLER':
        this.activeFilters.seller = parameter;
        break;
      case 'DISCOUNT':
        this.activeFilters.discountRange = parameter;
        break;
    }

    this.fetchProducts();
  }

  onRemoveFilter(event: { parameter: string; basedOn: string }) {
    const { basedOn } = event;

    switch (basedOn) {
      case 'PRICE':
        this.activeFilters.priceRange = null;
        break;
      case 'SELLER':
        this.activeFilters.seller = null;
        break;
      case 'DISCOUNT':
        this.activeFilters.discountRange = null;
        break;
    }

    this.fetchProducts();
  }

  displayChangePasswordModal() {
    this.show_modal = !this.show_modal;
    this.count = -1;
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

  showFullProduct(parameter) {
    this.myImagePath = parameter.coverImage;
    this.showProduct = { ...this.showFullProduct, ...parameter };
  }
}

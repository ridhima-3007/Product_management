import { Component, OnInit } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { Category, Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.scss'],
})
export class MylistingsComponent implements OnInit {
  allData: Product[] = [];
  categories: Category[] = [];
  subcategories: string[] = [];
  categoryName: string;
  isActive: string;
  subCategoryName: string;
  productName: string;
  pageSize: number = 10;
  pageNumber: number = 1;
  sortBy: string = 'name';
  sortOrder: string = 'asc';
  searchInput: string;
  length: number = 10;

  searchParams: HttpParams;

  constructor(
    private allproductsservice: AllProductService,
    private toaster: ToasterService,
    private router: Router,
    private categoryservice: CategoryService
  ) {}

  ngOnInit(): void {
    this.myCategoriesInit();
  }

  myCategoriesInit() {
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.getProducts();
  }

  setSearchParams() {
    this.searchParams = new HttpParams()
      .set('pageNumber', this.pageNumber.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy)
      .set('sortOrder', this.sortOrder);

    if (this.categoryName) {
      this.searchParams = this.searchParams.set(
        'categoryName',
        this.categoryName
      );
    }
    if (this.subCategoryName) {
      this.searchParams = this.searchParams.set(
        'subCategoryName',
        this.subCategoryName
      );
    }
    if (this.isActive) {
      this.searchParams = this.searchParams.set('isActive', this.isActive);
    }
    if (this.productName) {
      this.searchParams = this.searchParams.set(
        'productName',
        this.productName
      );
    }
    if (this.searchInput) {
      this.searchParams = this.searchParams.set(
        'searchInput',
        this.searchInput
      );
    }
  }

  getProducts() {
    this.setSearchParams();
    this.allproductsservice
      .getMyProducts(this.searchParams)
      .subscribe((data) => {
        this.allData = data.product;
        this.length = data.count;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.pageNumber = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    this.getProducts();
  }

  selectCategory(event) {
    this.categoryName = (event.target as HTMLSelectElement).value;
    this.getProducts();
    const category = this.categories.find(
      (cat) => cat.name === this.categoryName
    );

    if (category) {
      this.subcategories = [];
      this.subcategories = category.subcategories;
    } else {
      this.subcategories = [];
    }
  }

  selectSubCategory(event) {
    this.subCategoryName = (event.target as HTMLSelectElement).value;
    this.getProducts();
  }

  selectStatus(event) {
    this.isActive = (event.target as HTMLSelectElement).value;
    this.getProducts();
  }

  onSort(sort: Sort) {
    if (sort.direction === '') {
      this.sortBy = 'name';
      this.sortOrder = 'asc';
    } else {
      this.sortBy = sort.active;
      this.sortOrder = sort.direction;
    }
    this.getProducts();
  }

  getImageUrl(imagePath: string): string {
    return environment.APIURL + `/${imagePath}`;
  }

  displayedColumns: string[] = [
    'image',
    'name',
    'price',
    'discount',
    'quantity',
    'description',
    'action',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchInput = filterValue;
    this.getProducts();
  }

  viewProduct(product: Product) {
    this.router.navigate(['/product/viewProduct', { id: product._id }]);
  }

  editProduct(product: Product) {
    this.router.navigate(['/product/uploadProduct'], {
      queryParams: { id: product._id, isEditing: true },
    });
  }

  deleteProduct(product: Product) {
    this.toaster.confirmBox().then((result) => {
      if (result.isConfirmed) {
        this.allproductsservice.deleteProduct(product._id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Deactivated!',
              text: 'Your product has been deactivated.',
              icon: 'success',
            });
            this.getProducts();
          },
          (error) => {
            this.toaster.showError(error.error?.msg, 'Something went wrong');
          }
        );
      }
    });
  }

  activateProduct(product: Product) {
    this.allproductsservice.deleteProduct(product._id).subscribe(
      (response) => {
        this.toaster.showSuccess('', 'Product has been activated.');
        this.getProducts();
      },
      (error) => {
        this.toaster.showError(error.error?.msg, 'Something went wrong');
      }
    );
  }
}

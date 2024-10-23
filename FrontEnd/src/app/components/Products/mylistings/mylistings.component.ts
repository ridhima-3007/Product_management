import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Category, Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.scss'],
})
export class MylistingsComponent implements OnInit, AfterViewInit {
  allData: Product[] = [];
  categories: Category[] = [];
  subcategories: string[] = [];
  categoryName: string;
  isActive: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private allproductsservice: AllProductService,
    private toaster: ToasterService,
    private router: Router,
    private categoryservice: CategoryService
  ) {}

  ngOnInit(): void {
    this.myCategoriesInit();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.sort.active = 'name';
    this.sort.direction = 'asc';
  }

  myCategoriesInit() {
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.getProducts();
  }

  getProducts() {
    this.allproductsservice.getMyProducts().subscribe((data) => {
      this.allData = data;
      this.dataSource = new MatTableDataSource(this.allData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectCategory(event) {
    this.categoryName = (event.target as HTMLSelectElement).value;
    this.dataSource.filter = this.categoryName;
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
    const subCategory = (event.target as HTMLSelectElement).value;
    this.dataSource.filter = subCategory;
  }

  selectStatus(event) {
    this.isActive = (event.target as HTMLSelectElement).value;
    this.dataSource.filter = this.isActive;
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

  dataSource = new MatTableDataSource(this.allData);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewProduct(product: Product) {
    this.router.navigate(['/viewProduct', { id: product._id }]);
  }

  editProduct(product: Product) {
    this.router.navigate([
      '/uploadProduct',
      { id: product._id, isEditing: true },
    ]);
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

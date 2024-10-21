import { Component, OnInit, ViewChild } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.scss'],
})
export class MylistingsComponent implements OnInit {
  allData: Product[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategory: any;
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

  myCategoriesInit() {
    this.categoryservice.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.allproductsservice.getMyProducts().subscribe((data) => {
      this.allData = data;
      this.dataSource = new MatTableDataSource(this.allData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  selectCategory(event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.dataSource.filter = this.selectedCategory;
    const category = this.categories.find(
      (cat) => cat.name === this.selectedCategory
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

  editProduct(product: Product) {
    this.router.navigate([
      '/uploadProduct',
      { id: product._id, isEditing: true },
    ]);
  }

  deleteProduct(product) {
    this.toaster.confirmBox().then((result) => {
      if (result.isConfirmed) {
        this.allproductsservice.deleteProduct(product._id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            this.allData = this.allData.filter((p) => p._id !== product._id);
            this.dataSource = new MatTableDataSource(this.allData);
          },
          (error) => {
            this.toaster.showError(error.error?.msg, 'Something went wrong');
          }
        );
      }
    });
  }
}

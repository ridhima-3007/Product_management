import { Component, OnInit } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/sharedServices/toastr.service';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.scss'],
})
export class MylistingsComponent implements OnInit {
  allData: any[] = [];

  constructor(
    private allproductsservice: AllProductService,
    private toaster: ToasterService
  ) {}

  ngOnInit(): void {
    this.myCategoriesInit();
  }

  myCategoriesInit() {
    this.allproductsservice.getMyProducts().subscribe(
      (data) => {
        this.allData = data;
      },
      (error) => {
        console.log(error);
      }
    );
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

  editProduct(product) {}

  deleteProduct(product) {
    this.toaster.confirBox();
  }
}

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Product} from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.css']
})
export class MylistingsComponent implements OnInit {

  allData:Product[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private allproductsservice:AllProductService, private toaster: ToasterService, private router: Router){}

  ngOnInit(): void {
    this.allproductsservice.getMyProducts().subscribe(
      (data)=>{
        this.allData=data;
        this.dataSource = new MatTableDataSource(this.allData);
        this.dataSource.paginator = this.paginator;
      },
     )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getImageUrl(imagePath: string): string {
    return environment.APIURL+`/${imagePath}`;
  }

  displayedColumns: string[] = ['image','name', 'price', 'discount', 'quantity', 'description', 'action'];

  dataSource = new MatTableDataSource(this.allData);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editProduct(product: Product) {
    this.router.navigate(['/uploadProduct', {id: product._id, isEditing: true}])
  }

  deleteProduct(product) {
    this.toaster.confirmBox().then((result) => {
      if (result.isConfirmed) {
        this.allproductsservice.deleteProduct(product._id).subscribe(
          (response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            this.allData = this.allData.filter(p => p._id !== product._id);
          },
          (error) => {
            this.toaster.showError(error.error?.msg, "Something went wrong");
          }
        )
      }
    });
  }


}

import { Component } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.css']
})
export class MylistingsComponent {

  allData:any[]=[];
  
  constructor(private allproductsservice:AllProductService){
   this.allproductsservice.getMyProducts().subscribe(
    (data)=>{
      this.allData=data;
      console.log(data);
    },
    (error)=>{
      console.log(error);
    }
   )
  }

  getImageUrl(imagePath: string): string {
    return environment.APIURL+`/${imagePath}`;
  }

  displayedColumns: string[] = ['image','name', 'price', 'discount', 'quantity', 'description'];

  // dataSource = new MatTableDataSource(this.allData);

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}

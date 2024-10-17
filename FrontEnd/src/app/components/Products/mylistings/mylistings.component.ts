import { Component } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';

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
}

import { Component } from '@angular/core';
import { AllProductService } from 'src/app/Services/allproduct.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  allData:any[]=[];
  
  constructor(private allproductsservice:AllProductService){
   this.allproductsservice.getProducts().subscribe(
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
    return `http://localhost:8000/${imagePath}`;
  }
  

}

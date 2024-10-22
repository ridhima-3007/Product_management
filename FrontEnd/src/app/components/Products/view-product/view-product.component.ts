import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  product: Product;
  productId: string;
  allImages: string[];

  constructor(
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private allProductService: AllProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.viewInit();
  }

  viewInit() {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      this.getProduct(this.productId);
    });
  }

  getProduct(productId) {
    this.allProductService.getProductById(productId).subscribe(
      (product: Product) => {
        this.product = product;
        this.allImages = product.images;
      },
      (error) => {
        this.toaster.showError(error.error?.msg, 'Something went wrong');
      }
    );
  }

  getImageUrl(imagePath: string): string {
    return environment.APIURL + `/${imagePath}`;
  }

  calculateDiscountedPrice() {
    const price = this.product.price;
    const discount = this.product.discount;
    const newPrice = price - (price * discount) / 100;
    return Math.floor(newPrice);
  }

  changeImage(image: string) {
    this.product.coverImage = image;
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
        this.allProductService.deleteProduct(product._id).subscribe(
          (response) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
            this.router.navigate(['/myListings']);
          },
          (error) => {
            this.toaster.showError(error.error?.msg, 'Something went wrong');
          }
        );
      }
    });
  }
}

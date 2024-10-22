import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/Services/category.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AllProductService } from 'src/app/Services/allproduct.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-productform',
  templateUrl: './productupload.component.html',
  styleUrls: ['./productupload.component.scss'],
})
export class ProductuploadComponent implements OnInit {
  productForm: FormGroup;
  selectedCoverFile: File | null = null;
  selectedFiles: File[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  allowedTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/jpg',
    'image/webp',
    'image/svg',
  ];
  errorMessage: string | null = null;
  maxFileSize = 5 * 1024 * 1024;
  isEditingProduct: boolean = false;
  product_id: string;

  constructor(
    private fb: FormBuilder,
    private categoryservice: CategoryService,
    private route: ActivatedRoute,
    private allProductService: AllProductService,
    private toasterservice: ToasterService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productUploadFormInit();

    this.getCategories();
  }

  productUploadFormInit() {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?![0-9]+)[a-zA-Z0-9 ]{1,20}$'),
        ],
      ],
      price: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      Quantity: [
        '',
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')],
      ],
      discount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      coverImage: [null, [Validators.required]],
      images: [null],
    });
  }

  getCategories() {
    this.categoryservice.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log('Error Fetching Detais', error);
      }
    );

    this.productForm
      .get('category')
      .valueChanges.subscribe((selectedCategory) => {
        this.updateSubcategories(selectedCategory);
      });

    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      const isEditing = params.get('isEditing') === 'true';
      if (isEditing && productId) {
        this.isEditingProduct = true;
        this.product_id = productId;
        this.removeCoverValidator();
        this.getProduct(productId);
      }
    });
  }

  getProduct(productId) {
    this.allProductService.getProductById(productId).subscribe(
      (product: Product) => {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          discount: product.discount,
          Quantity: product.quantity,
          description: product.description,
          category: product.category,
          subcategory: product.subcategory,
        });

        this.selectedCoverFile = null;
        this.selectedFiles = [];
      },
      (error) => {
        this.toasterservice.showError(error.error?.msg, 'Something went wrong');
      }
    );
  }

  updateSubcategories(selectedCategory: string): void {
    if (!selectedCategory) {
      this.subcategories = [];
      this.productForm.get('subcategory').setValue('');
      return;
    }

    const category = this.categories.find(
      (cat) => cat.name === selectedCategory
    );

    if (category) {
      this.productForm.get('subcategory').setValue('');
      this.subcategories = category.subcategories;
    } else {
      this.subcategories = [];
    }
  }

  removeCoverValidator() {
    const coverControl = this.productForm.get('coverImage');
    if (coverControl) {
      coverControl.clearValidators();
      coverControl.updateValueAndValidity();
    }
  }

  onCoverFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.validateFile(file);
      this.selectedCoverFile = event.target.files[0];
    }
  }

  onFileSelected(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.validateFile(file);
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  validateFile(file: File): void {
    this.errorMessage = null;
    this.errorMessage = null;

    if (!this.allowedTypes.includes(file.type)) {
      this.toasterservice.showError('', 'Invalid File Type');
      this.toasterservice.showError('', 'Invalid File Type');
      return;
    }

    if (file.size > this.maxFileSize) {
      this.toasterservice.showError('', 'File Exceeds 5MB');
      this.toasterservice.showError('', 'File Exceeds 5MB');
      return;
    }
  }

  getErrors(field: string) {
    const uploadControl = this.productForm.get(field);
    if (uploadControl?.hasError('required')) {
      return `${field.toUpperCase()} is required`;
    }
    if (uploadControl?.hasError('pattern')) {
      if (field === 'name')
        return 'Name should not exceed 20 characters and should not contain only numbers';
      else if (field === 'price' || field === 'discount')
        return `${field.toUpperCase()} should be in digits`;
      else if (field === 'Quantity') return 'Quantity should be whole number';
    }
    if (uploadControl?.hasError('minlength')) {
      return 'Description should contain at least 30 characters.';
    }
    return '';
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('Quantity', this.productForm.get('Quantity')?.value);
    formData.append('subcategory', this.productForm.get('subcategory')?.value);
    formData.append('discount', this.productForm.get('discount')?.value);

    if (this.selectedCoverFile) {
      formData.append(
        'coverImage',
        this.selectedCoverFile,
        this.selectedCoverFile.name
      );
    }

    this.selectedFiles.forEach((file) => {
      formData.append('images', file, file.name);
    });

    if (this.isEditingProduct) {
      this.allProductService.updateProduct(formData, this.product_id).subscribe(
        (response) => {
          this.toasterservice.showSuccess('View Your product', response.msg);
          this.router.navigate(['/myListings']);
        },
        (error) => {
          this.toasterservice.showError(
            error.error?.msg,
            'Something went wrong'
          );
        }
      );
    } else {
      this.http
        .post(environment.APIURL + '/api/products', formData, {
          withCredentials: true,
        })
        .subscribe(
          (response) => {
            this.toasterservice.showSuccess('', 'Product created successfully');
            this.router.navigate(['/myListings']);
          },
          (error) => {
            this.toasterservice.showError(error.error?.msg, 'Error Occured');
          }
        );
    }
  }
}

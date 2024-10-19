import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/Services/category.service';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/sharedServices/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-productform',
  templateUrl: './productupload.component.html',
  styleUrls: ['./productupload.component.css'],
})
export class ProductuploadComponent implements OnInit {

  isEditing : boolean = false;

  productForm: FormGroup;
  selectedCoverFile: File | null = null;
  selectedFiles: File[] = [];
  categories: any[] = [];
  subcategories: any[] = [];
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif','image/jpg','image/webp','image/svg'];
   errorMessage:string|null=null;
   maxFileSize=5*1024*1024;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private categoryservice: CategoryService,
    private router: Router,
    private toasterservice:ToasterService,
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[a-zA-Z])(?![0-9]+)[a-zA-Z0-9 ]{1,20}$')
        ]
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]\\d{0,9}(\\.\\d{1,3})?$')
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(30)
        ]
      ],
      category: ['', [Validators.required]],
      subcategory: ['', [Validators.required]],
      Quantity: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$')
        ]
      ],
      discount: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]\\d{0,9}(\\.\\d{1,3})?$')
        ]
      ],
      coverImage: [null, [Validators.required]],
      images: [null],
    });
    

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

    if (!this.allowedTypes.includes(file.type)) {
      this.toasterservice.showError('','Invalid File Type')
      return;
    }

    if (file.size > this.maxFileSize) {
      this.toasterservice.showError('','File Exceeds 5MB')
      return;
    }

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

    this.http
      .post( environment.APIURL+'/api/products', formData, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          console.log('Product created successfully!', response);
         this.toasterservice.showSuccess('','Product Created Successfully')
          this.router.navigate(['/myListings']);
        },
        (error) => {
          console.error('Error creating product', error);
          this.toasterservice.showError('','Error Occured')
        }
      );
  }
}

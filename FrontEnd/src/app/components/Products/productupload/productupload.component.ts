import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/Services/category.service';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-productform',
  templateUrl: './productupload.component.html',
  styleUrls: ['./productupload.component.css']
})

export class ProductuploadComponent implements OnInit{
  productForm: FormGroup;
  selectedCoverFile: File | null = null;
  selectedFiles: File[] = [];
  categories: any[] = [];
  subcategories: any[] = []

  constructor(private fb: FormBuilder, private http: HttpClient, private categoryservice: CategoryService, private router: Router,private snackbar:MatSnackBar) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required, Validators.pattern('^[0-9]+$')],
      description: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      Quantity: ['', Validators.required, Validators.pattern('^[0-9]+$')],
      discount: ['', Validators.required, Validators.pattern('^[0-9]+$')],
      coverImage: [null, Validators.required],
      images: [null]
    });

    this.categoryservice.getCategories().subscribe(
      (data) => {
        this.categories = data
      },
      (error) => {
        console.log("Error Fetching Detais", error)
      }
    );

    this.productForm.get('category').valueChanges.subscribe(selectedCategory => {
      this.updateSubcategories(selectedCategory);
    });
  }

  updateSubcategories(selectedCategory: string): void {
    if (!selectedCategory) {
      this.subcategories = [];
      this.productForm.get('subcategory').setValue('');
      return;
    }

    const category = this.categories.find(cat => cat.name === selectedCategory);

    if (category) {
      this.productForm.get('subcategory').setValue('');
      this.subcategories = category.subcategories;
    } else {
      this.subcategories = [];
    }

  }


  onCoverFileSelected(event: any): void {
    this.selectedCoverFile = event.target.files[0];
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
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
      formData.append('coverImage', this.selectedCoverFile, this.selectedCoverFile.name);
    }

    this.selectedFiles.forEach(file => {
      formData.append('images', file, file.name);
    });

    this.http.post('http://localhost:8000/api/products', formData, { withCredentials: true }).subscribe(
      response => {
        console.log('Product created successfully!', response);
        this.snackbar.open("Product Created Successfully", "Close", {
          verticalPosition: 'top',
        });
        this.productForm.reset();
      },
      error => {
        console.error('Error creating product', error);
        this.snackbar.open("Product not Created", "Close", {
          verticalPosition: 'top',
        });
      }

    );
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productform',
  templateUrl: './productupload.component.html',
  styleUrls: ['./productupload.component.css']
})

export class ProductuploadComponent {
  productForm: FormGroup;
  selectedCoverFile: File | null = null; 
  selectedFiles: File[] = []; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      discount: ['', Validators.required]
    });
  }

  onCoverFileSelected(event: any): void {
    this.selectedCoverFile = event.target.files[0]; }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  onSubmit(): void {
    const formData: FormData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('discount', this.productForm.get('discount')?.value);

    if (this.selectedCoverFile) {
      formData.append('coverImage', this.selectedCoverFile, this.selectedCoverFile.name);
    }

    this.selectedFiles.forEach(file => {
      formData.append('images', file, file.name);
    });

    this.http.post('http://localhost:8000/api/products', formData).subscribe(
      response => console.log('Product created successfully!', response),
      error => console.error('Error creating product', error)
    );
  }
}

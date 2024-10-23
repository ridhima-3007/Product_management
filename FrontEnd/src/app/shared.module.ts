import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
})
export class SharedModule {}

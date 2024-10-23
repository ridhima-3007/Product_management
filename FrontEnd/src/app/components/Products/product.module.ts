import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { HomeComponent } from './home/home.component';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductuploadComponent } from './productupload/productupload.component';
import { SearchComponent } from './search/search.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProfileComponent } from '../auth/profile/profile.component';
import { ChangePasswordComponent } from '../auth/change-password/change-password.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    HomeComponent,
    MylistingsComponent,
    NavbarComponent,
    ProductuploadComponent,
    SearchComponent,
    SidenavComponent,
    ViewProductComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
  exports: [
    CategoryListComponent,
    HomeComponent,
    MylistingsComponent,
    NavbarComponent,
    ProductuploadComponent,
    SearchComponent,
    SidenavComponent,
    ViewProductComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
})
export class ProductModule {}

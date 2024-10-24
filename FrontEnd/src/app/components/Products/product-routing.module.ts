import { RouterModule, Routes } from '@angular/router';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { ProductuploadComponent } from './productupload/productupload.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { NgModule } from '@angular/core';
import { authGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: 'uploadProduct',
    canActivate: [authGuard],
    component: ProductuploadComponent,
  },
  {
    path: 'myListings',
    canActivate: [authGuard],
    component: MylistingsComponent,
  },
  {
    path: 'viewProduct',
    canActivate: [authGuard],
    component: ViewProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

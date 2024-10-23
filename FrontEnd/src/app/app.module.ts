import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authModule } from './components/auth/auth.module';
import { ProductModule } from './components/Products/product.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, authModule, ProductModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authModule } from './components/auth/auth.module';
import { ProductModule } from './components/Products/product.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CredentialsInterceptor } from './credentials.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, authModule, ProductModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CredentialsInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}

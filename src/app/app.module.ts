import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Modules/shared/shared.module';
import { errorInterceptorProviders } from './Utils/Helpers/Error.interceptor';
import { FooterComponent } from './Templates/footer/footer.component';
import { authInterceptorProviders } from './Utils/Helpers/Auth.interceptor';
import { HomeComponent } from './Templates/home/home.component';
import { HeaderComponent } from './Templates/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [errorInterceptorProviders , authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

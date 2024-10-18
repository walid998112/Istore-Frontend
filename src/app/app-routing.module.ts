import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Templates/home/home.component';
import { IsAuthGuard } from './Utils/Guards/is-auth.guard';
import { IsNotAuthGuard } from './Utils/Guards/is-not-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./Modules/auth/auth.module').then(m => m.AuthModule) , canActivate:[IsNotAuthGuard] },
  { path: 'account', loadChildren: () => import('./Modules/account/account.module').then(m => m.AccountModule) },
  { path: 'product', loadChildren: () => import('./Modules/product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

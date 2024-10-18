import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from './question-list/question-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { QuestionAskComponent } from './question-ask/question-ask.component';
import { ProductQuestionComponent } from './product-question/product-question.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { IsAuthGuard } from 'src/app/Utils/Guards/is-auth.guard';
import { IsAdminGuard } from 'src/app/Utils/Guards/is-admin.guard';

const routes: Routes = [
  { path: 'questions', component: QuestionListComponent, canActivate: [IsAuthGuard, IsAdminGuard] },
  { path: 'create', component: CreateProductComponent, canActivate: [IsAuthGuard, IsAdminGuard] },
  { path: 'create/:id', component: CreateProductComponent, canActivate: [IsAuthGuard, IsAdminGuard] },
  { path: 'question-ask', component: QuestionAskComponent },
  { path: 'product-question/:id', component: ProductQuestionComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [IsAuthGuard, IsAdminGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

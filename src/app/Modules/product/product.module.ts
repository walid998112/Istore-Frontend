import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { AddUpdateQuestionComponent } from './add-update-question/add-update-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionAskComponent } from './question-ask/question-ask.component';
import { ProductQuestionComponent } from './product-question/product-question.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import{ButtonModule} from 'primeng/button';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { ProductListComponent } from './product-list/product-list.component';
import {TableModule} from 'primeng/table';
import { LightgalleryModule } from 'lightgallery/angular';


@NgModule({
  declarations: [
    CreateProductComponent,
    AddUpdateQuestionComponent,
    QuestionListComponent,
    QuestionAskComponent,
    ProductQuestionComponent,
    ProductDetailsComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    DataViewModule,
    TagModule,
    CardModule,
    ButtonModule,
    GalleriaModule,
    TableModule,
    LightgalleryModule,
  ]
})
export class ProductModule { }

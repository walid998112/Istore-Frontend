import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Utils/Services/Product.service';

@Component({
  selector: 'app-product-question',
  templateUrl: './product-question.component.html',
  styleUrl: './product-question.component.css'
})
export class ProductQuestionComponent implements OnInit {
  ngOnInit(): void {
    this.id_question = Number(this.route.snapshot.paramMap.get('id'));
    this.getProducts();
  }

  products: any[] = [];
  id_question: number = 0;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  getProducts() {
    this.productService.getProductsByQuestionId(this.id_question).subscribe((data: any) => {
      this.products = data;
      console.log(this.products)
    })
  }

  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
    }
  }

}

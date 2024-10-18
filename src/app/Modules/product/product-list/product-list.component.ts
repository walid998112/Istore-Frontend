import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Utils/Services/Product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  ngOnInit(): void {
    this.getAll();
  }

  constructor(private productService: ProductService) { }

  products: any;
  filterProducts: any;
  search: string = "";

  getAll() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = this.filterProducts = data;
      console.log(this.products);
    })
  }

  filter() {
    this.filterProducts = this.products.filter((p: any) => p.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.getAll();
      },
      error: (err) => console.log(err)
    })
  }


}

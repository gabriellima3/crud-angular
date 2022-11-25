import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    
    this.productService.delete(`${this.product.id}`).subscribe((res) => {
      console.log(res)
      this.productService.showMessage('Produto excluído com sucesso!')
      this.router.navigate(['/products']);
      
    })

    /*this.productService.delete(this.product.id)
    console.log('teste')*/

  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}

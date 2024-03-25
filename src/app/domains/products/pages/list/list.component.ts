import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Product } from '../../../shared/models/product.model';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  createData(num:number){
    let data = []
    for(let i=1; i<=num; i++){
      const item: Product = {
        id: Date.now(),
        title: `Producto ${i}`,
        price: Number(`${i}000`),
        img: `https://picsum.photos/640/640?r=${i}`,
        creationAt: new Date().toISOString()
      }
      data.push(item)
    }
    return data
  }

  products= signal<Product[]>(this.createData(10))
  cart = signal<Product[]>([])
  addToCart(product:Product){
    this.cart.update(prevState => [...prevState, product] )
  }
}

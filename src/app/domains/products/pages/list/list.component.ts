import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  createData(num:number){
    let data = []
    for(let i=1; i<=num; i++){
      const j = Math.floor(Math.random() * (num - 1 + 1)) + 1
      const item = {
        id: j,
        title: `Producto ${j}`,
        price: Number(`${j}000`),
        img: `https://picsum.photos/640/640?r=${j}`
      }
      data.push(item)
    }
    return data
  }

  products = this.createData(10)
  fromChild(event:string){
    console.log("Estamos en el padre!")
    console.log(event)
  }
}

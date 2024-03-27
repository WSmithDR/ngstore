import { CommonModule } from "@angular/common"
import { Component, Input, SimpleChanges, inject, signal } from "@angular/core"
import { RouterLinkWithHref } from "@angular/router"
import { ProductComponent } from "@products/components/product/product.component"
import { HeaderComponent } from "@shared/components/header/header.component"
import { Category } from "@shared/models/category.model"
import { Product } from "@shared/models/product.model"
import { CartService } from "@shared/services/cart.service"
import { CategoryService } from "@shared/services/category.service"
import { ProductService } from "@shared/services/product.service"


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  private cartService = inject(CartService)
  private productService = inject(ProductService)
  private categoryService = inject(CategoryService)
  @Input() category_id?: string

  products = signal<Product[]>([])
  categories = signal<Category[]>([])

  ngOnInit(){
    this.getCategories()
  }

  ngOnChanges(changes: SimpleChanges){
      this.getProducts()
  }
  addToCart(product:Product){
    this.cartService.addToCart(product)
  }

  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products) => {
        this.products.set(products)
      },
      error: ()=>{
        "Error getting the products!"
      }
    })
  }

  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (categories) => {
        this.categories.set(categories)
      },
      error: ()=>{
        "Error getting the products!"
      }
    })
  }
}

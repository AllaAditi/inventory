import { Component } from '@angular/core';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-inventory-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayInventoryComponent {
  products: Product[] = [];
  editedProduct: Product = { id: '', name: '', quantity: 0, price: 0 };
  isProductFormSubmitted: boolean = false;

  constructor() {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    this.products = storedProducts;
  }

  deleteProduct(product: Product) {
    const index = this.products.indexOf(product);

    if (index !== -1) {
      this.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(this.products));
      console.log('Product data deleted successfully!');
    }
  }

  editProduct(product: Product) {
    this.editedProduct = { ...product };
  }

  updateProduct() {
    this.isProductFormSubmitted = true;
  
    if (this.isValidProduct(this.editedProduct)) {
      const index = this.products.findIndex(p => p.id === this.editedProduct.id);
  
      if (index !== -1) {
        this.products[index] = { ...this.editedProduct };
        localStorage.setItem('products', JSON.stringify(this.products));
        console.log('Product data updated successfully!');
        alert('Product updated successfully!');
        this.cancelEdit();
      }
    }
  }
  

  cancelEdit() {
    this.editedProduct = { id: '', name: '', quantity: 0, price: 0 };
    this.isProductFormSubmitted = false;
  }

  private isValidProduct(product: Product): boolean {
    return !!product.name && !!product.quantity && !!product.price;
  }
}

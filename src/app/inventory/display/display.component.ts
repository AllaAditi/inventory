import { Component } from '@angular/core';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayInventoryComponent {
  products: Product[] = [];
  editedProduct: Product = { id: '', name: '', quantity: 0, price: 0 }; // Track the currently edited product

  constructor() {
    // Retrieve products from local storage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // Assign retrieved products to the component's property
    this.products = storedProducts;
  }

  deleteProduct(product: Product) {
    // Find the index of the product in the array
    const index = this.products.indexOf(product);

    if (index !== -1) {
      // Remove the product from the array
      this.products.splice(index, 1);

      // Update the local storage with the updated products array
      localStorage.setItem('products', JSON.stringify(this.products));
      console.log('Product data deleted successfully!');
    alert("Item deleted successfully");
    }
  }

  editProduct(product: Product) {
    // Find the index of the product in the array
    const index = this.products.findIndex(p => p.id === product.id);
  
    if (index !== -1) {
      // Assign the corresponding product from the array to the editedProduct
      this.editedProduct = this.products[index];
    }
  }
  

  updateProduct() {
    if (this.editedProduct) {
      // Find the index of the edited product in the array
      const index = this.products.findIndex(p => p.id === this.editedProduct?.id);

      if (index !== -1) {
        // Update the product in the array
        this.products[index] = { ...this.editedProduct };

        // Reset the currently edited product
        this.editedProduct = { id: '', name: '', quantity: 0, price: 0 };

        // Update the local storage with the updated products array
        localStorage.setItem('products', JSON.stringify(this.products));
        console.log('Product data updated successfully!');
        alert("Item updated successfully");
      }
    }
  }

  cancelEdit() {
    // Reset the currently edited product
    this.editedProduct = { id: '', name: '', quantity: 0, price: 0 };
  }
}
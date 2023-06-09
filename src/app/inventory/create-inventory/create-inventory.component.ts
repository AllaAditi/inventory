import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-create-inventory',
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent {
  product: Product = {
    id: '',
    name: '',
    quantity: 0,
    price: 0
  };
  nameError: string = '';

  constructor(private toastr: ToastrService) { }

  isFormValid(): boolean {
    return !!this.product.name && !!this.product.quantity && !!this.product.price;
  }

  submitForm() {
    if (!this.isFormValid()) {
      this.nameError = 'All fields are required';
      return;
    }
    

    // Generate a system-generated ID
    const generatedId = this.generateId();

    // Set the generated ID to the product
    this.product.id = generatedId;

    // Get existing products from local storage
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // Add new product to the array
    existingProducts.push(this.product);

    // Save updated products array to local storage
    localStorage.setItem('products', JSON.stringify(existingProducts));

    console.log('Product data saved successfully!');
    this.toastr.success('Product updated successfully!');
    

    // Reset the form
    this.product = {
      id: '',
      name: '',
      quantity: 0,
      price: 0
    };
    this.nameError = '';
  }

  generateId(): string {
    // Generate a random string as the ID
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 8;
    let id = '';
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  }

}

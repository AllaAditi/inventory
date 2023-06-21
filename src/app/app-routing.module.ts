import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayInventoryComponent } from '../app/inventory/display/display.component';
import { CreateInventoryComponent } from '../app/inventory/create-inventory/create-inventory.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: CreateInventoryComponent },
  { path: 'display', pathMatch: 'full', component: DisplayInventoryComponent},
  { path: 'create', pathMatch: 'full', component: CreateInventoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
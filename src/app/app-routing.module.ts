/* ==========================================================================
** Mange App Navigation
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { NgModule } from '@angular/core';
  import { Routes, RouterModule } from '@angular/router';
  import { ProductsComponent } from './components/products/products.component';
  import { AddProductComponent } from './components/add-product/add-product.component';
  import { AddInt1Component } from './components/add-int1/add-int1.component';
  import { AddInt2Component } from './components/add-int2/add-int2.component';
  import { AddRawMaterialsComponent } from './components/add-raw-materials/add-raw-materials.component';
  
// --------------------------------------
// Define App Routes
// --------------------------------------
  const routes: Routes = [
    {path : '',component : ProductsComponent},
    {path : 'add-product', component : AddProductComponent},
    {path : 'add-int1', component : AddInt1Component},
    {path : 'add-int2', component : AddInt2Component},
    {path : 'add-raw-materials', component : AddRawMaterialsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// --------------------------------------
// Export Router
// --------------------------------------
export class AppRoutingModule { }

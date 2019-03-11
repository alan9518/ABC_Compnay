import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddInt1Component } from './components/add-int1/add-int1.component';
import { AddInt2Component } from './components/add-int2/add-int2.component';
import { AddRawMaterialsComponent } from './components/add-raw-materials/add-raw-materials.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationButtonComponent } from './components/Navigation/navigation-button/navigation-button.component';
import { AppButtonComponent } from './components/app-button/app-button.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductsTableComponent,
    AddProductComponent,
    AddInt1Component,
    AddInt2Component,
    AddRawMaterialsComponent,
    NavigationComponent,
    NavigationButtonComponent,
    AppButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

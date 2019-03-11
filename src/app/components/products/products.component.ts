/* ==========================================================================
** FG Prodcuts Component
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Component, OnInit } from '@angular/core';
  import { Product } from '../../models/Product';

// --------------------------------------
// Component Definition
// --------------------------------------
  @Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
  })


// --------------------------------------
// Component Class & Functions
// --------------------------------------
  export class ProductsComponent implements OnInit {

    // --------------------------------------
    // Products Properties
    // --------------------------------------
    // Dummy Products
    products : Product[];

    // --------------------------------------
    // Constructor
    // --------------------------------------
    constructor() { }

    ngOnInit() {
      this.products = [
        { 
          id:1,
          comp_Material : 1,
          comp_MaterialName : "Int 1",
          ramMaterial1 : 1,
          ramMaterial1Name : "Raw Material 1",
          rawMaterial2 : 2,
          rawMaterial2Name : "Raw Material 2",
          name : "FG 1",
          quantity : 50,
        },
        { 
          id:2,
          comp_Material : 1,
          comp_MaterialName : "Int 1",
          ramMaterial1 : 1,
          ramMaterial1Name : "Raw Material 1",
          rawMaterial2 : 2,
          rawMaterial2Name : "Raw Material 2",
          name : "FG 2",
          quantity : 50,
        },
        { 
          id:3,
          comp_Material : 1,
          comp_MaterialName : "Int 1",
          ramMaterial1 : 1,
          ramMaterial1Name : "Raw Material 1",
          rawMaterial2 : 2,
          rawMaterial2Name : "Raw Material 2",
          name : "FG 3",
          quantity : 50,
        }
      ]
    }

  }

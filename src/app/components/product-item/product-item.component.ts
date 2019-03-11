/* ==========================================================================
** FG Prodcut Component
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Component, OnInit, Input } from '@angular/core';
  import { Product } from 'src/app/models/Product';

// --------------------------------------
// Component Definition
// --------------------------------------
  @Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css']
  })

// --------------------------------------
// Component Definition
// --------------------------------------
  export class ProductItemComponent implements OnInit {

    // --------------------------------------
    // Bind input property (Product)
    // --------------------------------------
    @Input() product : Product

    constructor() { }

    ngOnInit() {
    }

  }

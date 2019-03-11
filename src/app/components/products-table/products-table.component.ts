/* ==========================================================================
** Products Table
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */
// --------------------------------------
// Imports
// --------------------------------------
  import { Component, OnInit } from '@angular/core';
  import { ProductsService } from '../../services/products.service';
  import { Product } from 'src/app/models/Product';
  import { forkJoin } from "rxjs";


// --------------------------------------
// Component Definition
// --------------------------------------
  @Component({
    selector: 'app-products-table',
    templateUrl: './products-table.component.html',
    styleUrls: ['./products-table.component.css']
  })

// --------------------------------------
// Component Class
// --------------------------------------
  export class ProductsTableComponent implements OnInit {

    products: Product[];
    rawProducts :Product [];
    columns: string[];

    constructor(private productsService: ProductsService) {

    }


    

    // --------------------------------------
    // Init Services Methods
    // --------------------------------------
    ngOnInit() {
      this.productsService.getAllProducts().subscribe(productsData => {
        this.products = productsData
        // Get Product Raw Materials

        let promises = productsData.map((product)=> {
          // return product
          let promise =  this.productsService.getProductRawMaterials(product)
          return promise
        })

        this.columns = ['ID', 'Name', 'int1', 'Quantity']

        console.log('TCL: ProductsTableComponent -> ngOnInit -> promises', promises)

        // --------------------------------------
        // TODO : Merge RMS to Table
        // --------------------------------------
        // forkJoin(promises).subscribe(results => {
          
        //   console.log('TCL: ProductsTableComponent -> ngOnInit -> results', results[0])
        //   let rawResults =  results;

        // });

        
      
      
      });
    }



    // --------------------------------------
    // Merge Products
    // --------------------------------------
    mergeProducts(productsData, rawResults) {
      console.log('TCL: ProductsTableComponent -> mergeProducts -> productsData', productsData)
      
      this.products = productsData.map((prod)=> {
          // for(let raw of rawResults) {
            rawResults.map((raw, index)=> {
              if(index > 1 )
                index = 0
              if(prod.id === raw[index].id_Product) {
                
                // prod.materials = raw.filter((r)=> {
                //   if()
                // });
                console.log('TCL: mergeProducts -> prod.materials', prod.materials)
                
                return prod;
                
              }

              console.log('TCL: ProductsTableComponent -> mergeProducts -> prod', prod)
              
              
            })
      })
      
      
    

    }


  }

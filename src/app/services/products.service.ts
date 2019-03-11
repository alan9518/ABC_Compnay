/* ==========================================================================
** Products Service
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import {Product} from '../models/Product';
  import {ProductRawMaterial} from '../models/ProductRawMaterial';
  import { DUMMYPRODUCTS } from './mockData/mockProducts';



// --------------------------------------
// Request Options
// --------------------------------------
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

// --------------------------------------
// Service Definition
// -------------------------------------- 
  @Injectable({
    providedIn: 'root'
  })

// --------------------------------------
// Service
// -------------------------------------- 
  export class ProductsService {

    // --------------------------------------
    // API Endpoints
    // --------------------------------------
      getAllProductsURL :string =  'http://localhost:3000/products';
      saveNewProductURL : string = 'http://localhost:3000/products/';
      saveProductsRawMaterialsURL : string = 'http://localhost:3000/products/materials';


    constructor(private http : HttpClient) { }


    /* ==========================================================================
    ** DB Connection
    ** ========================================================================== */
    // --------------------------------------
    // Get All Products
    // --------------------------------------
    getAllProducts() : Observable <Product[]> {
      return this.http.get<Product[]>(`${this.getAllProductsURL}`);
    }

    // --------------------------------------
    // Get Product Raw Materials
    // --------------------------------------
    getProductRawMaterials(product : Product): Observable<Product[]> {
      const {id} = product;
      const getMaterialsProductURL : string = `${this.getAllProductsURL}/${id}/materials`
			console.log('TCL: ProductsService -> constructor -> id', id)
      return this.http.get<Product[]>(`${getMaterialsProductURL}`);
    }


    // --------------------------------------
    // Save New Product
    // --------------------------------------
    saveNewProduct(product : Product): Observable<Product> {
      console.log('TCL: ProductsService -> constructor -> product', product)
      return this.http.post<Product>(this.saveNewProductURL, product, httpOptions)

    }

    // --------------------------------------
    // Save Relation between Products & 
    // Raw Materials
    // RM1
    // --------------------------------------
    saveProductsRawMaterials(material: ProductRawMaterial): Observable<ProductRawMaterial> {
      console.log('TCL: ProductsService -> constructor -> material', material)
      return this.http.post<ProductRawMaterial>(this.saveProductsRawMaterialsURL, material, httpOptions);
    }

    /* ==========================================================================
    ** Dummy Data
    ** ========================================================================== */

      // --------------------------------------
      // GET Dummy Products
      // --------------------------------------
      getDummyProcuts()  {
        return (DUMMYPRODUCTS);
      }

      // --------------------------------------
      // GET Columns
      // --------------------------------------
      getDummyColumns () {
        // const tableColumns =  DUMMYPRODUCTS.filter((col)=> {return })
        // const tableColumns = ['ID', 'Name', 'INT 1', 'RM1', 'RM2'];
        const tableColumns = ["id", "name", "comp_Material",  "ramMaterial1",  "rawMaterial2",  "quantity"]
        return tableColumns;
      }
  }

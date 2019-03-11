/* ==========================================================================
** Add Product Componet
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Component, OnInit, EventEmitter, Output } from '@angular/core';
  import { RawMaterialsService } from '../../services/raw-materials.service';
  import { ComposedMaterialsService } from '../../services/composed-materials.service';
  import { ProductsService } from '../../services/products.service';
  import { RawMaterial } from '../../models/RawMaterial';
  import { ProductRawMaterial } from '../../models/ProductRawMaterial';
  import { Int1 } from '../../models/int1';
  import { forkJoin } from 'rxjs';


  // --------------------------------------
  // Component Definition
  // --------------------------------------
  @Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.css']
  })

// --------------------------------------
// Component Class
// --------------------------------------
  export class AddProductComponent implements OnInit {


    // --------------------------------------
    // Class Properties
    // --------------------------------------
    @Output() addFGProduct: EventEmitter<any> = new EventEmitter();

    name: String = "";
    selecedInt1: Number = 0;
    selecedRM1: Number = 0;
    selecedRM2: Number = 0;
    quantity: Number = 0;
    errorMessage : string = "";
    sucessMessage : string = "";
    rawMaterials2: RawMaterial[];
    rawMaterials1: RawMaterial[];
    int1Materials: Int1[];


    // --------------------------------------
    // Init Service
    // --------------------------------------
    constructor(private productsService : ProductsService, private rawMaterialsService: RawMaterialsService, private composedMaterialsService: ComposedMaterialsService) { }


    // --------------------------------------
    // Subscribe to DB Data
    // --------------------------------------
    ngOnInit() {
      this.rawMaterialsService.getAllMaterials().subscribe(materials => {
        this.rawMaterials1 = this.filterResults(materials, 1);
        this.rawMaterials2 = this.filterResults(materials, 2);
        
      
      });

      // Get INT1 Materials
      this.composedMaterialsService.getInt1MaterialTypes().subscribe(comMaterials => {
        this.int1Materials = comMaterials
      
      })
    }

    // --------------------------------------
    // filter Results ot Match the Type Id
    // --------------------------------------
    filterResults(materials, typeID): RawMaterial[] {
      const resultsByType = materials.filter((material) => { return material.id_Type_raw_materials === typeID })
      return resultsByType;
    }


    // --------------------------------------
    // Validate Field Inputs
    // --------------------------------------
    validateInputs(): boolean {
      if (this.name === '') {
          this.errorMessage = "You must give a name to the product";
          return false;
      }
      else if(this.selecedRM1 === 0 || this.selecedRM2 === 0 || this.selecedInt1 === 0) {
          this.errorMessage = "You must select the material";
          return false;
      }
      else if(this.quantity <= 0 || this.quantity > 100) {
          this.errorMessage = "The Quantity Can't be less than 0 or higher than 100"
          return false;
      }
      else {
          this.errorMessage = '';
          return true
      }
    }


    // --------------------------------------
    // Submit Form
    // --------------------------------------
    onSubmit () {

      // Validate Fields
      if(this.validateInputs() === false)
        return;
    
      // Save Product
      const product = {
        name : this.name,
        int1 : this.selecedInt1,
        quantity : this.quantity
      }
      


      // Save Product
      this.productsService.saveNewProduct(product).subscribe(productResponse =>{

        const {insertId} = productResponse;

        // Create Materials Array
        const productsMaterials : ProductRawMaterial[] = [
          {idProduct : insertId, idRawMaterial : this.selecedRM1 },
          {idProduct : insertId, idRawMaterial : this.selecedRM2 }
        ];


        // Save Relationship betwwen raw materials and int

            const productsRawMaterialsPromise1 = this.productsService.saveProductsRawMaterials(productsMaterials[0]);
            const productsRawMaterialsPromise2 = this.productsService.saveProductsRawMaterials(productsMaterials[1])
            


            forkJoin([productsRawMaterialsPromise1, productsRawMaterialsPromise2]).subscribe(results => {

                // Show Sucess Message
                this.sucessMessage = "FG Product Saved";
                
                // Reset Fields
                this.name  = "";
                this.selecedRM1 = 0;
                this.selecedRM2 = 0;
                this.selecedInt1 = 0;
                this.quantity  = 0;
            });
            
        })
        

        this.errorMessage  = "";
        window.setTimeout(()=>{this.sucessMessage  = "";}, 700)  

      // Emit Event
      this.addFGProduct.emit(product);
    }

  }

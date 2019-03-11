/* ==========================================================================
** Create Int 2 Material Component
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Component, OnInit, EventEmitter, Output } from '@angular/core';
  import { RawMaterialsService } from '../../services/raw-materials.service';
  import { ComposedMaterialsService } from '../../services/composed-materials.service';
  import { RawMaterial } from '../../models/RawMaterial';
  import { ComposedRawMaterial } from '../../models/ComposedRawMaterial';
  import { Int1 } from '../../models/int1';
  import { Int2 } from '../../models/Int2';
  import { forkJoin } from 'rxjs';



// --------------------------------------
// Component Definition
// --------------------------------------
  @Component({
    selector: 'app-add-int1',
    templateUrl: './add-int1.component.html',
    styleUrls: ['./add-int1.component.css']
  })

// --------------------------------------
// Component Class
// --------------------------------------
  export class AddInt1Component implements OnInit {

    // --------------------------------------
    // Class Properties
    // --------------------------------------
    @Output() addInt1: EventEmitter<any> = new EventEmitter();

    name: String = "";
    selecedRM2: Number = 0;
    selecedRM3: Number = 0;
    selecedInt2: Number = 0;
    quantity: Number = 0;
    errorMessage : string = "";
    sucessMessage : string = "";
    rawMaterials2: RawMaterial[];
    rawMaterials3: RawMaterial[];
    int2Materials: Int2[];

    // --------------------------------------
    // Init Service
    // --------------------------------------
    constructor(private rawMaterialsService: RawMaterialsService, private composedMaterialsService: ComposedMaterialsService) { }

    // --------------------------------------
    // Subscribe to DB Data
    // --------------------------------------
    ngOnInit() {
      this.rawMaterialsService.getAllMaterials().subscribe(materials => {
        this.rawMaterials2 = this.filterResults(materials, 2);
        this.rawMaterials3 = this.filterResults(materials, 3);
      });

      // Get INT2 Materials
      this.composedMaterialsService.getInt2MaterialTypes().subscribe(comMaterials => {
        this.int2Materials = comMaterials
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
      else if(this.selecedRM2 === 0 || this.selecedRM3 === 0 || this.selecedInt2 === 0) {
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
    // Submifor Form
    // --------------------------------------
    onSubmit() {

        // Validate Fields
      if(this.validateInputs() === false)
          return;


      // Save Int1 
      const intMaterial1 = {
        name: this.name,
        type : 1,
        quantity : this.quantity
    }

    

    this.composedMaterialsService.saveComposedInt1Material(intMaterial1).subscribe(materialResponse=> {
      
      const {insertId} = materialResponse;
      
      const materials : ComposedRawMaterial [] = [
          {idComposed : insertId, idRawMaterial :this.selecedRM2,    idInt2Material :null},
          {idComposed : insertId ,idRawMaterial :this.selecedRM3,    idInt2Material :null},
          {idComposed : insertId ,idRawMaterial :null,               idInt2Material :this.selecedInt2} 
      ]

      // Save Relationship betwwen raw materials and int

      const composesRawMaterialPromise1 = this.composedMaterialsService.saveComposedRawMaterial(materials[0]);
      const composesRawMaterialPromise2 = this.composedMaterialsService.saveComposedRawMaterial(materials[1]);
      const composesRawMaterialPromise3 = this.composedMaterialsService.saveComposedRawMaterial(materials[2]);

      forkJoin([composesRawMaterialPromise1, composesRawMaterialPromise2, composesRawMaterialPromise3]).subscribe(results => {

            // Show Sucess Message
            this.sucessMessage = "Int 1 Saved";
            
            // Reset Fields
            this.name  = "";
            this.selecedRM2 = 0;
            this.selecedRM3 = 0;
            this.selecedInt2 = 0;
            this.quantity  = 0;
        });
        
    })

    this.errorMessage  = "";
    window.setTimeout(()=>{this.sucessMessage  = "";}, 700)  




      this.addInt1.emit(intMaterial1);
    }

  }




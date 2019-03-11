/* ==========================================================================
** Create Int 2 Material Component
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Component, OnInit, EventEmitter,Output } from '@angular/core';
  import { RawMaterialsService } from '../../services/raw-materials.service';
  import { RawMaterial } from '../../models/RawMaterial';
  
  



// --------------------------------------
// Component Definition
// --------------------------------------
  @Component({
    selector: 'app-add-raw-materials',
    templateUrl: './add-raw-materials.component.html',
    styleUrls: ['./add-raw-materials.component.css']
  })


// --------------------------------------
// Component Class
// --------------------------------------
export class AddRawMaterialsComponent implements OnInit  {


    // --------------------------------------
    // Component Properties
    // --------------------------------------
    @Output() saveRawMaterial: EventEmitter<any> = new EventEmitter();

    name : String = "";
    selectedRawMaterialType: Number = 0;
    quantity : Number = null;
    rawMaterialsType: RawMaterial[];
    errorMessage : string = "";
    sucessMessage : string = "";

  

    // --------------------------------------
    // Init Service
    // --------------------------------------
    constructor(private rawMaterialsService: RawMaterialsService) { }

    // --------------------------------------
    // Subscribe to DB Data
    // --------------------------------------
    ngOnInit() {
        this.rawMaterialsService.getMaterialsTypes().subscribe(materialsType => {
            this.rawMaterialsType = materialsType;
            console.log('TCL: ngOnInit -> this.rawMaterials', this.rawMaterialsType)
            
        });


    }

    // --------------------------------------
    // filter Results ot Match the Type Id
    // --------------------------------------
    filterResults(materials, typeID) : RawMaterial[] {
        const resultsByType = materials.filter((material)=> {return material.id_Type_raw_materials === typeID})
        return resultsByType;
    }


    // --------------------------------------
    // Validate Field Inputs
    // --------------------------------------
    validateInputs() :boolean {
      if(this.name === '') {
        this.errorMessage = "You must give a name to the product";
        return false;
      }
      else if(this.selectedRawMaterialType === 0) {
        this.errorMessage = "You must select a type of material";
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
        if(this.validateInputs() === false)
          return;
        
    // Save Raw Material
        const rawMaterial = {
            name: this.name,
            type: this.selectedRawMaterialType,
            quantity : this.quantity
        }
        

        this.rawMaterialsService.saveRawMaterial(rawMaterial).subscribe(material=>{
          console.log('TCL: AddRawMaterialsComponent -> onSubmit -> material', material)
          this.sucessMessage = "Material Saved";
          // Reset Inputs
          this.name = "";
          this.selectedRawMaterialType = 0;
          this.quantity = null;
        });    

        window.setTimeout(()=>{this.sucessMessage  = "";}, 700)  
        this.saveRawMaterial.emit(rawMaterial);
      }

}



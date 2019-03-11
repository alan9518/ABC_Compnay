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
    import { ComposedMaterialsService } from '../../services/composed-materials.service';
    import { RawMaterial } from '../../models/RawMaterial';
    import { ComposedRawMaterial } from '../../models/ComposedRawMaterial';
    import { forkJoin } from "rxjs";

    import { Int1 } from '../../models/int1';
    import { Int2 } from '../../models/Int2';
    



// --------------------------------------
// Component Definition
// --------------------------------------
@Component({
    selector: 'app-add-int2',
    templateUrl: './add-int2.component.html',
    styleUrls: ['./add-int2.component.css']
})


// --------------------------------------
// Component Class
// --------------------------------------
export class AddInt2Component implements OnInit {

    @Output() addInt2: EventEmitter<any> = new EventEmitter();

    name : String = "";
    selecedRM4: Number = 0;
    selecedRM5: Number = 0;
    selecedRM6: Number = 0;
    quantity : Number = 0;
    errorMessage : string = "";
    sucessMessage : string = "";

    rawMaterials4: RawMaterial[];
    rawMaterials5: RawMaterial[];
    rawMaterials6: RawMaterial[];

    // --------------------------------------
    // Init Service
    // --------------------------------------
    constructor(private rawMaterialsService: RawMaterialsService, private composedMaterialsService : ComposedMaterialsService) { }

    // --------------------------------------
    // Subscribe to DB Data
    // --------------------------------------
    ngOnInit() {
        this.rawMaterialsService.getAllMaterials().subscribe(materials => {
            this.rawMaterials4 = this.filterResults(materials, 4);
            this.rawMaterials5 = this.filterResults(materials, 5);
            this.rawMaterials6 = this.filterResults(materials, 6);
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
        else if(this.selecedRM4 === 0 || this.selecedRM5 === 0 || this.selecedRM6 === 0) {
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
        // Validate Fields
        if(this.validateInputs() === false)
            return;


        // Save New Int2
        const intMaterial2 = {
            name: this.name,
            type : 2,
            quantity : this.quantity
        }


        this.composedMaterialsService.saveComposedInt2Material(intMaterial2).subscribe(materialResponse=> {
            const {insertId} = materialResponse;
            const materials : ComposedRawMaterial [] = [
                {idComposed : insertId,idRawMaterial :this.selecedRM4, idInt2Material : null},
                {idComposed : insertId ,idRawMaterial :this.selecedRM5, idInt2Material : null},
                {idComposed : insertId ,idRawMaterial :this.selecedRM6, idInt2Material : null},
            ]
            // Save Relationship betwwen raw materials and int

            const composesRawMaterialPromise1 = this.composedMaterialsService.saveComposedRawMaterial(materials[0]);
            const composesRawMaterialPromise2 = this.composedMaterialsService.saveComposedRawMaterial(materials[1]);
            const composesRawMaterialPromise3 = this.composedMaterialsService.saveComposedRawMaterial(materials[2]);


            forkJoin([composesRawMaterialPromise1, composesRawMaterialPromise2, composesRawMaterialPromise3]).subscribe(results => {

                // Show Sucess Message
                this.sucessMessage = "Int 2 Saved";
                
                // Reset Fields
                this.name  = "";
                this.selecedRM4 = 0;
                this.selecedRM5 = 0;
                this.selecedRM6 = 0;
                this.quantity  = 0;
            });
            
        })

        this.errorMessage  = "";
        window.setTimeout(()=>{this.sucessMessage  = "";}, 700)  
        
    
        this.addInt2.emit(intMaterial2);
    }

}

/* ==========================================================================
** Raw Materials Service
** 10/03/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Imports
// --------------------------------------
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  import { ComposedRawMaterial } from '../models/ComposedRawMaterial';
  import { Int1 } from '../models/int1';
  import { Int2 } from '../models/Int2';

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
// Service Class
// --------------------------------------
  export class ComposedMaterialsService {

    // --------------------------------------
    // API Endpoints
    // --------------------------------------
      getAllMaterialsURl: string = 'http://localhost:3000/composed-materials';
      getInt1MaterialTypesURL : string = 'http://localhost:3000/composed-materials/type/1';
      getInt2MaterialTypesURL : string = 'http://localhost:3000/composed-materials/type/2';
      saveComposedMaterialURL : string = 'http://localhost:3000/composed-materials';
      saveComposedRawMaterialsInt2URL :string = 'http://localhost:3000/composed-materials/int2';
      saveComposedRawMaterialsInt1URL :string = 'http://localhost:3000/composed-materials/int1';

      
    constructor(private http: HttpClient) { }


    // --------------------------------------
    // Get Raw Materials 
    // --------------------------------------
    getAllMaterials(): Observable<any[]> {
      return this.http.get<any[]>(`${this.getAllMaterialsURl}`);
    }

    // --------------------------------------
    // Get Todos By Type
    // --------------------------------------
    // getMaterialsByType(typeId) : Observable<ComposedMaterial[]> {
    //   console.log('TCL: ComposedMaterialsService -> constructor -> typeId', typeId)
    //   return this.http.get<ComposedMaterial[]>(`${this.getAllMaterialsURl}`);
    // }


    // --------------------------------------
    // Get Raw Materials Types
    // --------------------------------------
    getInt1MaterialTypes(): Observable<Int1[]> {
      return this.http.get<Int1[]>(`${this.getInt1MaterialTypesURL}`);
    }

    // --------------------------------------
    // Get Raw Materials Types
    // --------------------------------------
    getInt2MaterialTypes(): Observable<Int2[]> {
      return this.http.get<Int2[]>(`${this.getInt2MaterialTypesURL}`);
    }


    // --------------------------------------
    // POST Material
    // --------------------------------------
    saveComposedInt1Material(material: Int1): Observable<Int1> {
      console.log('TCL: Int1sService -> constructor -> material', material)
      return this.http.post<Int1>(this.saveComposedMaterialURL, material, httpOptions);
    }

    saveComposedInt2Material(material: Int2): Observable<Int2> {
      console.log('TCL: Int2sService -> constructor -> material', material)
      return this.http.post<Int2>(this.saveComposedMaterialURL, material, httpOptions);
    }


    // --------------------------------------
    // Save Composed & Raw Mateials Relation
    // for Int2
    // --------------------------------------
    saveComposedRawMaterial(comp_rawMaterial: ComposedRawMaterial): Observable<ComposedRawMaterial> {
			console.log('TCL: ComposedMaterialsService -> constructor -> ComposedRawMaterial', comp_rawMaterial)
      
      return this.http.post<ComposedRawMaterial>(this.saveComposedRawMaterialsInt2URL, comp_rawMaterial, httpOptions);
    }



  }









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

  import { RawMaterial } from '../models/RawMaterial';

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
export class RawMaterialsService {

  // --------------------------------------
  // API Endpoints
  // --------------------------------------
    getAllMaterialsURl: string = 'http://localhost:3000/raw-materials/';
    getMaterialTypesURL : string = 'http://localhost:3000/raw-materials/type/raw';
    saveRawMaterialURL : string = 'http://localhost:3000/raw-materials';

  constructor(private http: HttpClient) { }


  // --------------------------------------
  // Get Raw Materials 
  // --------------------------------------
  getAllMaterials(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.getAllMaterialsURl}`);
  }

  // --------------------------------------
  // Get Todos By Type
  // --------------------------------------
  // getMaterialsByType(typeId) : Observable<RawMaterial[]> {
  //   console.log('TCL: RawMaterialsService -> constructor -> typeId', typeId)
  //   return this.http.get<RawMaterial[]>(`${this.getAllMaterialsURl}`);
  // }


  // --------------------------------------
  // Get Raw Materials Types
  // --------------------------------------
  getMaterialsTypes(): Observable<RawMaterial[]> {
    return this.http.get<RawMaterial[]>(`${this.getMaterialTypesURL}`);
  }

  // --------------------------------------
  // POST Material
  // --------------------------------------
  saveRawMaterial(material: RawMaterial): Observable<RawMaterial> {
		console.log('TCL: RawMaterialsService -> constructor -> material', material)
    return this.http.post<RawMaterial>(this.saveRawMaterialURL, material, httpOptions);
  }


  // // Delete Todo
  // deleteTodo(todo: Todo): Observable<Todo> {
  //   const url = `${this.todosUrl}/${todo.id}`;
  //   return this.http.delete<Todo>(url, httpOptions);
  // }

 

  // // Toggle Completed
  // toggleCompleted(todo: Todo): Observable<any> {
  //   const url = `${this.todosUrl}/${todo.id}`;
  //   return this.http.put(url, todo, httpOptions);
  // }
}





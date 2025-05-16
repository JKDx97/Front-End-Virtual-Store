import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcService {

   private apiUrl = 'http://localhost:3000/pcs/available'; // Ajusta la URL según tu backend
    private pcsImageUrl = 'http://localhost:3000/pc_imagen'
  
  
    constructor(private http : HttpClient) { }
  
    getAvailablePcs(): Observable<any[]> {
      return this.http.get<any[]>(this.apiUrl);
    }
    getImagesPcs(pc_id : string){
      return this.http.get<any[]>(`${this.pcsImageUrl}/${pc_id}`)
    }
}

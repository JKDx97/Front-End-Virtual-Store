import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaptopsService {

  private apiUrl = 'http://localhost:3000/laptop/available'; // Ajusta la URL según tu backend
  private laptopsImageUrl = 'http://localhost:3000/laptops_image'


  constructor(private http : HttpClient) { }

  getAvailableLaptops(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getImagesLaptops(id : string){
    return this.http.get<any[]>(`${this.laptopsImageUrl}/${id}`)
  }

}

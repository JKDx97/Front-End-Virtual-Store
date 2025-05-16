import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaptopsService {

  private apiUrl = `${environment.api}/laptop/available`;
  private laptopsImageUrl = `${environment.api}/laptops_image`


  constructor(private http : HttpClient) { }

  getAvailableLaptops(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getImagesLaptops(id : string){
    return this.http.get<any[]>(`${this.laptopsImageUrl}/${id}`)
  }

}

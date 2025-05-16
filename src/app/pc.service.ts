import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PcService {
  private apiUrl = `${environment.api}/pcs/available`; 
  private pcsImageUrl = `${environment.api}/pc_imagen`;

  constructor(private http: HttpClient) {}

  getAvailablePcs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getImagesPcs(pc_id: string) {
    return this.http.get<any[]>(`${this.pcsImageUrl}/${pc_id}`);
  }
}

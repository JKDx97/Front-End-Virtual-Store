import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsolasService {

  private consolasUrl = `${environment.api}/consola`;
  private consolaImagenUrl = `${environment.api}/consolas_image`;

  constructor(private http: HttpClient) {}

  getAvailableConsolas(): Observable<any> {
    return this.http.get(`${this.consolasUrl}/available`);
  }
  getImagesConsola(consola_id: string) {
    return this.http.get<any[]>(`${this.consolaImagenUrl}/${consola_id}`);
  }
}

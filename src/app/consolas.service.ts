import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsolasService {

  private consolasUrl = 'http://localhost:3000/consola';
  private consolaImagenUrl = 'http://localhost:3000/consolas_image';

  constructor(private http: HttpClient) {}

  getAvailableConsolas(): Observable<any> {
    return this.http.get(`${this.consolasUrl}/available`);
  }
  getImagesConsola(consola_id: string) {
    return this.http.get<any[]>(`${this.consolaImagenUrl}/${consola_id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private apiUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

  getVehiculos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}

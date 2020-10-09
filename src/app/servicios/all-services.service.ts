import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../clases/pais';

@Injectable({
  providedIn: 'root'
})
export class AllServicesService {

  private url = "https://restcountries.eu/rest/v2/region/europe";
  constructor(private http: HttpClient) {}

  public getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.url);
  }

}

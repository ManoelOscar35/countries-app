import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountriesList } from '../models/listCountries';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<CountriesList> {
    return this.httpClient.get<CountriesList>(`${environment.BASE_URL}/v3.1/all`);
  }
}

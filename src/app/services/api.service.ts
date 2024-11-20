import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
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

  //retorna País(es) de acordo com o termo da busca
  public buscaCountry(termoDaBusca: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/v3.1/name/${termoDaBusca}`)
    .pipe(
      retry(10) //numero de tentativas que vai conectar com o servidor
    )
  }

  //retorna região do país de acordo com o termo da busca
  public buscaRegion(termoDaBusca: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.BASE_URL}/v3.1/region/${termoDaBusca}`)
    .pipe(
      retry(5) //numero de tentativas que vai conectar com o servidor
    )
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  public country: any;
  public countries: any[] = [];

  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private storeService: StoreService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getCountry();
    this.getCountries()
  }

  getCountry() {
    this.storeService.getCountry().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: any) => {
        console.log(res),
        this.country = res;
      }
    });
  }

  getCountries() {
    this.apiService.getCountries().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: any) => {
        this.countries = res;
      }
    });
  }

  getCurrencyDetails(currencies: any): { name: string; symbol: string } | null {
    if (currencies && typeof currencies === 'object') {
      const currencyKey = Object.keys(currencies)[0]; // Pega a primeira chave, ex.: "CHF"
      return {
        name: currencies[currencyKey]?.name || 'Unknown currency',
        symbol: currencies[currencyKey]?.symbol || ''
      };
    }
    return null;
  }

  getLanguages(languages: any): string {
    if (languages && typeof languages === 'object') {
      return Object.values(languages).join(', '); // Retorna todos os idiomas como string separados por vírgulas
    }
    return 'Unknown languages';
  }


  getBorderCountries(borders: string[]): string[] {
    if (borders && this.countries) {
      return borders.map((code) => {
        const country = this.countries.find(c => c.cca3 === code);
        return country ? country.name.common : code;  // Retorna o nome do país ou o código caso não encontre
      });
    }
    return [];
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next([]);
  }
 
}

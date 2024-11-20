import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesList } from 'src/app/models/listCountries';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from './../../shared/store.service';
import { debounceTime, distinctUntilChanged, from, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public countries: any;
  public country: string = '';
  public region: string = '';

  private pesquisaCountry: Subject<string> = new Subject<string>();
  private pesquisaRegion: Subject<string> = new Subject<string>();
  unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getCountries();

    this.pesquisaCountry
    .pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(1000), //executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), //preveni que ocorra duas pesquisas idênticas
      switchMap((country: any) => {
        if (country.trim() === '') {
          return from(this.countries);
        }
        return this.apiService.buscaCountry(country);
      })
    )
    .subscribe({
      next: (res: any) => { 
        this.countries = [];
        this.countries = res;
      },
      error: (err: Error) =>  {
        console.error(err),
        alert("Algo deu errado, tente novamente"),
        window.location.reload();
      },
      complete: () => console.log("Stream concluída com sucesso!")
    })

    this.pesquisaRegion
    .pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(1000), //executa a ação do switchMap após 1 segundo
      distinctUntilChanged(), //preveni que ocorra duas pesquisas idênticas
      switchMap((region: any) => {
        if (region.trim() === '') {
          return from(this.countries);
        }
        return this.apiService.buscaRegion(region);
      })
    )
    .subscribe({
      next: (res: any) => { 
        this.countries = [];
        this.countries = res;
      },
      error: (err: Error) => {
        console.error(err),
        alert("Algo deu errado, tente novamente"),
        window.location.reload();
      }, 
      complete: () => console.log("Stream concluída com sucesso!")
    })
  }

  getCountries() {
    this.apiService.getCountries().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: CountriesList) => {
        this.countries = res;
      }, 
      error: (error: Error) => {
        console.log(error)
      },
      complete: () => {
        console.log('Its completed!');
      }
    });
  }

  setCountry(country: object) {
    this.storeService.setCountry(country);
  }

  onSearch(event: Event) {
    event.preventDefault(); // Evita o envio do formulário padrão
    console.log(this.country)
    this.pesquisaCountry.next(this.country);
  }

  onRegionChange() {
    console.log(this.region);
    this.pesquisaRegion.next(this.region);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next([]);
  }
}

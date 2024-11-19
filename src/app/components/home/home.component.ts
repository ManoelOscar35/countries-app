import { Component, OnInit } from '@angular/core';
import { CountriesList } from 'src/app/models/listCountries';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from './../../shared/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public countries: any;

  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.apiService.getCountries().subscribe({
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
}

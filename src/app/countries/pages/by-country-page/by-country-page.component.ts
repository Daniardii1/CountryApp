import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../interfaces/search-type.enum';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})

export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialTerm: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialTerm = this.countriesService.cacheStore.byCountry.term;
  }

  searchCountry(country: string): void {
    this.isLoading = true;

    this.countriesService.search(SearchType.Country, country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

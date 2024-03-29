import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type.enum';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})

export class ByCountryPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  searchCountry(country: string): void {
    this.isLoading = true;

    this.countriesService.search(SearchType.Country, country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

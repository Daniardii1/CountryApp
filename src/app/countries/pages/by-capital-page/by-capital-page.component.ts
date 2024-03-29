import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../enums/search-type.enum';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})

export class ByCapitalPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  searchCapital(capital: string): void {
    this.isLoading = true;

    this.countriesService.search(SearchType.Capital, capital)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

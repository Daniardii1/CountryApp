import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchType } from '../../interfaces/search-type.enum';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})

export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialTerm: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.initialTerm = this.countriesService.cacheStore.byCapital.term;
    this.countries = this.countriesService.cacheStore.byCapital.countries;
  }

  searchCapital(capital: string): void {
    this.isLoading = true;

    this.countriesService.search(SearchType.Capital, capital)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

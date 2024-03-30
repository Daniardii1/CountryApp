import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Country } from '../../interfaces/country';
import { SearchType } from '../../interfaces/search-type.enum';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})

export class ByCountryPageComponent implements OnInit, OnDestroy {

  private cacheStoreSubscription?: Subscription;

  public countries: Country[] = [];
  public initialTerm: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.cacheStoreSubscription = this.countriesService.currentCacheStore.subscribe(cacheStore => {
      if (!cacheStore.byCountry) return;
      this.initialTerm = cacheStore.byCountry.term;
      this.countries = cacheStore.byCountry.countries;
    });
  }

  searchCountry(country: string): void {

    if (country === this.initialTerm && this.countries.length > 0) return;

    this.isLoading = true;
    this.countriesService.search(SearchType.Country, country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.cacheStoreSubscription?.unsubscribe();
  }
}

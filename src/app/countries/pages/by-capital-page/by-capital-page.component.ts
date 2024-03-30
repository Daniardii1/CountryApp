import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Country } from '../../interfaces/country';
import { SearchType } from '../../interfaces/search-type.enum';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})

export class ByCapitalPageComponent implements OnInit, OnDestroy {

  private cacheStoreSubscription?: Subscription;

  public countries: Country[] = [];
  public initialTerm: string = '';
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.cacheStoreSubscription = this.countriesService.currentCacheStore.subscribe(cacheStore => {
      if (!cacheStore.byCapital) return;
      this.initialTerm = cacheStore.byCapital.term;
      this.countries = cacheStore.byCapital.countries;
    });
  }

  searchCapital(capital: string): void {

    if (capital === this.initialTerm && this.countries.length > 0) return;

    this.isLoading = true;
    this.countriesService.search(SearchType.Capital, capital)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.cacheStoreSubscription?.unsubscribe();
  }
}

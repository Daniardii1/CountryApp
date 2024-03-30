import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Country } from '../../interfaces/country';
import { SearchType } from '../../interfaces/search-type.enum';
import { Region } from '../../interfaces/region.type';
import { CountriesService } from '../../services/countries.service';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})

export class ByRegionPageComponent implements OnInit, OnDestroy {

  private cacheStoreSubscription?: Subscription;

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.cacheStoreSubscription = this.countriesService.currentCacheStore.subscribe(cacheStore => {
      if (!cacheStore.byRegion) return;
      this.countries = cacheStore.byRegion.countries;
      this.selectedRegion = cacheStore.byRegion.region;
    });
  }

  searchRegion(region: Region): void {

    if (region === this.selectedRegion && this.countries.length > 0) return;

    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.search(SearchType.Region, region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.cacheStoreSubscription?.unsubscribe();
  }
}

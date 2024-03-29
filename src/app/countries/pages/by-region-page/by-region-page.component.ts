import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { SearchType } from '../../enums/search-type.enum';

type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})

export class ByRegionPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  searchRegion(region: Region): void {

    this.isLoading = true;
    this.selectedRegion = region;

    this.countriesService.search(SearchType.Region, region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}

import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { SearchType } from '../../enums/search-type.enum';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})

export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) { }

  searchRegion(region: string): void {
    this.countriesService.search(SearchType.Region, region)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}

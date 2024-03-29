import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, map, tap} from 'rxjs';

import { Country } from '../interfaces/country';
import { SearchType } from '../interfaces/search-type.enum';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  };

  constructor(private httpClient: HttpClient) { }

  public search(type: SearchType, term: string): Observable<Country[]> {
    const url = this.getUrl(`${type}/${term}`);

    return this.getCountriesRequest(url).pipe(
      tap(countries => this.storeCountriesInCache(type, term, countries))
    );
  }

  public searchByCode(code: string): Observable<Country | null> {
    const url = this.getUrl(`${SearchType.Code}/${code}`);
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  private getUrl(path: string): string {
    return `${this.apiUrl}/${path}`;
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  private storeCountriesInCache(type: SearchType, term: string, countries: Country[]): void {

    switch (type) {
      case SearchType.Capital:
        this.cacheStore.byCapital = { term, countries };
        break;
      case SearchType.Country:
        this.cacheStore.byCountry = { term, countries };
        break;
      case SearchType.Region:
        this.cacheStore.byRegion = { region: term as Region, countries };
        break;
    }
  }
}


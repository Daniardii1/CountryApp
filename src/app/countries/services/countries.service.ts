import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, catchError, of, map, tap, BehaviorSubject} from 'rxjs';

import { Country } from '../interfaces/country';
import { SearchType } from '../interfaces/search-type.enum';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private cacheKey: string = 'cacheStore';

  private cacheStore: BehaviorSubject<CacheStore>;
  public currentCacheStore: Observable<CacheStore>;

  constructor(private httpClient: HttpClient) {
    const initialCacheStore = this.loadFromLocalStorage() || {
      byCapital: { term: '', countries: [] },
      byCountry: { term: '', countries: [] },
      byRegion: { region: '', countries: [] }
    };

    this.cacheStore = new BehaviorSubject(initialCacheStore);
    this.currentCacheStore = this.cacheStore.asObservable();
  }

  public search(type: SearchType, term: string): Observable<Country[]> {
    const url = this.getUrl(`${type}/${term}`);

    return this.getCountriesRequest(url).pipe(
      tap(countries => this.storeCountriesInCache(type, term, countries))
    );
  }

  public searchByCode(code: string): Observable<Country | null> {
    const url = this.getUrl(`${SearchType.Code}/${code}`);
    return this.getCountriesRequest(url)
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

    const newCacheStore = { ...this.cacheStore.value };

    switch (type) {
      case SearchType.Capital:
        newCacheStore.byCapital = { term, countries };
        break;
      case SearchType.Country:
        newCacheStore.byCountry = { term, countries };
        break;
      case SearchType.Region:
        newCacheStore.byRegion = { region: term as Region, countries };
        break;
    }
    this.cacheStore.next(newCacheStore);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(this.cacheStore.value));
  }

  private loadFromLocalStorage(): CacheStore | null {

    const data = localStorage.getItem(this.cacheKey);
    return data ? JSON.parse(data) : null;
  }
}


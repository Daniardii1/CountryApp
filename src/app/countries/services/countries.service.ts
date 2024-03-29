import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, map, tap} from 'rxjs';
import { Country } from '../interfaces/country';
import { SearchType } from '../enums/search-type.enum';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  public search(type: SearchType, term: string): Observable<Country[]> {
    const url = this.getUrl(`${type}/${term}`);
    return this.fetchCountries(url);
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

  private fetchCountries(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }
}

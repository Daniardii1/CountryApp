import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of} from 'rxjs';
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyServices {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  getCharacterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  searchCharacters(name: string, status: string = '', page: number = 1): Observable<ApiResponse> {
    let url = `${this.apiUrl}?page=${page}`;
    if (name) {
      url += `&name=${name}`;
    }
    if (status && status !== '') {
      url += `&status=${status}`;
    }
    return this.http.get<ApiResponse>(url);
  }
}
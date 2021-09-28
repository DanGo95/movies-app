import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Movie, MoviesResponse } from '../interfaces/movies-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsReponse } from '../interfaces/credits-response';
import { MovieVideos } from '../interfaces/movie-videos';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url: string = 'https://api.themoviedb.org/3';
  private page = 1;
  public loading = false;

  constructor( private http: HttpClient ) { }

  get params() {
    return {
      api_key: 'YOUR-API-KEY',
      language: 'es-ES',
      page: this.page.toString()
    }
  }

  resetPage() {
    this.page = 1;
  }

  getAll(): Observable<Movie[]> {

    if ( this.loading ) {
      return of([]);
    }

    this.loading = true;
    return this.http.get<MoviesResponse>(`${ this.url }/movie/now_playing`,{ params: this.params })
      .pipe(
        map( (resp) => resp.results ),
        tap( () => {
          this.page += 1;
          this.loading = false;
        })
      )
  }

  search( title: string ): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: title };

    return this.http.get<MoviesResponse>(`${ this.url }/search/movie`, { params })
      .pipe(
        map( resp => resp.results )
      )

  }

  getMovie( id: string ) {
    return this.http.get<MovieResponse>(`${ this.url }/movie/${ id }`, { params: this.params })
      .pipe(
        catchError( err => of(null) )
      )
  }

  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CreditsReponse>(`${ this.url }/movie/${ id }/credits`, { params: this.params })
      .pipe(
        map( resp => resp.cast ),
        catchError( err => of([]) )
      )
  }

  getVideo( id: number ) {
    return this.http.get<MovieVideos>(`${ this.url }/movie/${ id }/videos`, { params: this.params })
      .pipe(
        map( (videos: any) => videos.results)
      )
  }

  getRecommendations( id: string ) {
    return this.http.get<MoviesResponse>(`${ this.url }/movie/${ id }/recommendations`, { params: this.params })
      .pipe(
        map( (resp) => resp.results)
      )
  }

}

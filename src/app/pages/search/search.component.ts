import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/movies-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ) {

      if ( this.moviesService.loading ) { return; }

      this.moviesService.getAll().subscribe( movies => {
        this.movies.push(...movies);
      })
    }
  }

  public title: string = '';
  public movies: Movie[] = [];

  constructor( private activatedRoute: ActivatedRoute, private moviesService: MoviesService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      this.title = params.text;
      this.moviesService.search( params.text ).subscribe( movies => {
        this.movies = movies;
      })
    })

  }

}

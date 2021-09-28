import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../interfaces/movies-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

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

  constructor( private moviesService: MoviesService ) { }

  ngOnInit(): void {

    this.moviesService.getAll().subscribe( movies => {
      this.movies = movies;
      this.moviesSlideshow = movies;
    })

  }

  ngOnDestroy() {
    this.moviesService.resetPage();
  }

}

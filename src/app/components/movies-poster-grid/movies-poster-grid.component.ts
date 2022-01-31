import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movies-response';

@Component({
  selector: 'app-movies-poster-grid',
  templateUrl: './movies-poster-grid.component.html',
  styleUrls: ['./movies-poster-grid.component.css']
})
export class MoviesPosterGridComponent implements OnInit {

  @Input() movies!: Movie[];

  constructor( private router: Router ) { }

  ngOnInit(): void {}

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/movie', movie.id]);
  }



}

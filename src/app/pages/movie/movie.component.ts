import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { combineLatest } from 'rxjs';
import { Movie } from '../../interfaces/movies-response';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  public movie!: MovieResponse;
  public movies: Movie[] = [];
  public cast: Cast[] = [];
  public videoUrl = '';

  constructor( private activatedRoute: ActivatedRoute, private moviesService: MoviesService, private location: Location, private router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {

      let { id } = params;
  
      combineLatest([
        this.moviesService.getMovie(id),
        this.moviesService.getCast(id),
        this.moviesService.getRecommendations(id),
        this.moviesService.getVideo(id)
      ]).subscribe( ([movie, cast, recomendations, video]) => {
        if ( !movie ) {
          this.router.navigateByUrl('/home');
          return;
        }
        this.movie = movie;
        this.cast = cast.filter( actor => actor.profile_path !== null );
        this.videoUrl = video.key
        this.movies = recomendations;
      }, err => {
        this.router.navigateByUrl('/home');
      })
    })

  }


  onReturn() {
    this.location.back();
  }

}

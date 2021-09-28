import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { combineLatest } from 'rxjs';
import { MovieVideos } from '../../interfaces/movie-videos';
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

    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.moviesService.getMovie(id),
      this.moviesService.getCast(id),
      this.moviesService.getRecommendations(id)
    ]).subscribe( ([movie, cast, movies]) => {
      if ( !movie ) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movies = movies;
      this.movie = movie;
      this.cast = cast.filter( actor => actor.profile_path !== null );
      
      this.moviesService.getVideo(this.movie.id).subscribe( (movies: MovieVideos[]) => {
        if (movies.length > 0) {
          this.videoUrl = movies[0].key;
        }
      })
      
    })
  }


  onReturn() {
    this.location.back();
  }

}

import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/movies-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies!: Movie[];

  public mySwiper!: Swiper;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  onMovieClick( movie: Movie ) {
    this.router.navigate(['/movie', movie.id]);
  }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true
    });
  }

  onSlideNext() {
    this.mySwiper.slideNext();
  }

  onSlidePrev() {
    this.mySwiper.slidePrev();
  }

}

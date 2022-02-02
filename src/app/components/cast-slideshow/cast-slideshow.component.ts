import { Component, Input, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() cast!: Cast[];
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 5.3,
      freeMode: true,
      spaceBetween: 15,
      // arregla el problema de tamaño al cargar otra película
      observer: true,
      observeParents: true
    });
  }

  ngOnDestroy(): void {
      this.cast = []
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { CastSlideshowComponent } from './cast-slideshow/cast-slideshow.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MoviesPosterGridComponent } from './movies-poster-grid/movies-poster-grid.component';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'ng-starrating';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    SlideshowComponent,
    CastSlideshowComponent,
    NavbarComponent,
    MoviesPosterGridComponent
  ],
  exports: [
    SlideshowComponent,
    CastSlideshowComponent,
    NavbarComponent,
    MoviesPosterGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule
  ]
})
export class ComponentsModule { }

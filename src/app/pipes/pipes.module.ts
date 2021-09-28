import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe';
import { VideoPipe } from './video.pipe';
import { SafePipe } from './safe.pipe';



@NgModule({
  declarations: [
    PosterPipe,
    VideoPipe,
    SafePipe
  ],
  exports: [
    PosterPipe,
    VideoPipe,
    SafePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }

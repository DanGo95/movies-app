import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {

  transform(videoUrl: string): string {
    return `https://www.youtube.com/embed/${videoUrl}`;
  }

}

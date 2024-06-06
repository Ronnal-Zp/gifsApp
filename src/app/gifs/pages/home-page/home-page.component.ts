import { Component } from '@angular/core';
import { Gif } from '../../interfaces/SearchResponse.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private gifsService: GifsService) { }

  get gifs(): Gif[] {
    return this.gifsService.gifList;
  }

}

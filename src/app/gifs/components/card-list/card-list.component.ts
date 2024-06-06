import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/SearchResponse.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {

  @Input() gifs: Gif[] = [];

}

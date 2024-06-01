import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {

  constructor(
    private gifsService: GifsService
  ) { }

  @ViewChild('txtSearchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const tag = this.searchInput.nativeElement.value;
    this.gifsService.searchTag(tag)
    this.searchInput.nativeElement.value = '';
  }

}

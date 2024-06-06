import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/SearchResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadLocalStorage();

    if(this._tagsHistory.length == 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private _tagsHistory: string[] = [];
  private GIPHY_API_KEY = 'tNBOZE7t6dKIeCdkweeHgwKCw40aozSU';
  private GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[] = [];

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
  }

  searchTag(tag: string, limit: number = 20): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams();

    this.httpClient.get<SearchResponse>(this.GIPHY_BASE_URL+'/search?q=' +tag+ '&api_key=' +this.GIPHY_API_KEY+ '&limit=' +limit)
      .subscribe((res) => {
        this.gifList = res.data;

      })

  }

}

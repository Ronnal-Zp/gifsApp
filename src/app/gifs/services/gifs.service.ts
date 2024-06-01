import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private _tagsHistory: string[] = [];
  private GIPHY_API_KEY = 'tNBOZE7t6dKIeCdkweeHgwKCw40aozSU';
  private GIPHY_BASE_URL = 'https://api.giphy.com/v1/gifs';

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    if(tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams();

    this.httpClient.get(this.GIPHY_BASE_URL+'/search?q='+ tag +'&api_key='+ this.GIPHY_API_KEY)
      .subscribe((res) => {
        console.log(res);
      })

  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  current_url = 'http://localhost'

  getUrl() {
    return this.current_url
  }

}

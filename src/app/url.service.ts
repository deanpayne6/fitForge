import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  current_url = 'https://localhost'

  current_port = '3200'

  getUrl() {
    return this.current_url + ':' + this.current_port
  }

}

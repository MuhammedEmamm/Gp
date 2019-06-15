import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class WordCloudService {

  constructor(private http: HttpClient) { }

  GetWordCloud(cn: any, la: any) {
    return this.http.get(endpoint('WordCloud') + cn + '&lang=' + la);
  }
}

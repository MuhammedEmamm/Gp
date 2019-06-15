import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }
  FetchTweets(Query: any, Counter: any , Lang : any ,FilterRe : any , FilterRep : any  , ModelType : any) {
    return this.http.get(endpoint('FetchTweets') + `?query=${Query + FilterRe + FilterRep}&count=${Counter}&lang=${Lang}&modeltype=${ModelType}`);
  }
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TwitterService } from './twitter.service';

@Component({
  selector: 'app-twitter',
  providers: [TwitterService],
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {
  regex = new RegExp('^[\u0621-\u064A0-9 ]+$');

  constructor(private tweetservice: TwitterService, private el: ElementRef) {

  }

  FilterReTweets: any = '';
  FilterReplies: any = '';
  ModelType: any = '1';
  Data: {
    labels: any[],
    datasets: { data: any[], backgroundColor: any[] }[]
  };

  options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  type = 'pie';
  submit: boolean = false;

  formData: {
    Query: any,
    Counter: number
  } = { Query: '', Counter: 5 };

  TweetURl: {
    Sentiment: any,
    SentimentWord: any,
    id: any
  }[] =
    [];

  TweetURlP: {
    Sentiment: any,
    SentimentWord: any,
    id: any
  }[] =
    [];
  TweetURlN: {
    Sentiment: any,
    SentimentWord: any,
    id: any
  }[] =
    [];
  TweetURlNE: {
    Sentiment: any,
    SentimentWord: any,
    id: any
  }[] =
    [];

  lang: any = 'en';

  Sentiment: {
    totalResults: number,
    totalResultsP: number,
    totalResultsN: number,
    totalResultsNE: number
  } = {
      totalResults: 0,
      totalResultsP: 0,
      totalResultsN: 0,
      totalResultsNE: 0
    };

  //Start on Submit Function
  OnSubmit() {
    console.log(this.ModelType) ; 
    //submit = true for showing the results section and pie charts on HTML
    this.submit = true;
    this.TweetURl = [];
    //Show Pre-loader 
    if (document.getElementById('page-loader'))
      document.getElementById('page-loader').style.display = 'block';

    //check for filter retweets if checked or not to add it on the query
    if (this.FilterReTweets) {
      console.log(this.FilterReTweets);
      this.FilterReTweets = ' -filter:retweets'
    }
    else {
      this.FilterReTweets = '';
    }
    //check for filter replies if checked or not to add it on the query

    if (this.FilterReplies) {
      console.log(this.FilterReplies);
      this.FilterReplies = ' -filter:replies'
    }
    else {
      this.FilterReplies = '';
    }

    //initialize the pie chart data
    this.Data = { labels: ['Neutral', 'Postive', 'Negative'], datasets: [{ data: Array(3).fill(0), backgroundColor: ['rgba(0,124,255,1)', 'rgba(0,128,0,1)', 'rgba(255 , 0 , 0 ,1)'] }] };

    //check for the pattern of the query to detect the language
    if (this.regex.test(this.formData.Query)) {
      console.log('arabic');
      this.lang = 'ar';
    }

    //callback of the fetchtweets HTTP Request
    this.tweetservice.FetchTweets(this.formData.Query, this.formData.Counter, this.lang, this.FilterReTweets, this.FilterReplies, this.ModelType).subscribe((res: any) => {
      if (res) {
        
        this.TweetURl = res;
        this.Sentiment.totalResults = this.TweetURl.length;
        this.Sentiment.totalResultsP = this.TweetURl.filter(it => (it['SentimentWord'] == 'Very Good' || it['SentimentWord'] == 'Good') && it['Sentiment'] != 500).length;
        this.TweetURlP = this.TweetURl.filter(it => (it['SentimentWord'] == 'Very Good' || it['SentimentWord'] == 'Good') && it['Sentiment'] != 500);
        this.Sentiment.totalResultsN = this.TweetURl.filter(it => (it['SentimentWord'] == 'Very Poor' || it['SentimentWord'] == 'Poor')).length;
        this.TweetURlN = this.TweetURl.filter(it => (it['SentimentWord'] == 'Very Poor' || it['SentimentWord'] == 'Poor'));
        this.Sentiment.totalResultsNE = this.TweetURl.filter(it => (it['SentimentWord'] == 'Neutral')).length;
        this.TweetURlNE = this.TweetURl.filter(it =>  (it['SentimentWord'] == 'Neutral'));
        this.TweetURl = this.TweetURl.filter(it => it['Sentiment'] != 500);
        this.Data = { labels: ['Neutral', 'Postive', 'Negative'], datasets: [{ data: [(this.Sentiment.totalResultsNE / this.Sentiment.totalResults * 100), (this.Sentiment.totalResultsP / this.Sentiment.totalResults * 100), (this.Sentiment.totalResultsN / this.Sentiment.totalResults * 100)], backgroundColor: ['rgba(0,124,255,1)', 'rgba(0,128,0,1)', 'rgba(255 , 0 , 0 ,1)'] }] };

      }
      let e = this.el.nativeElement.querySelector('#search-results');
      e.scrollIntoView({ behavior: "smooth", block: "start" });

      if (document.getElementById('page-loader'))
        document.getElementById('page-loader').style.display = 'none';

      this.lang = 'en';
    });

  }
  //end OnSubmit Function 

  ngOnInit() { }

}

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
    Sentiment2: any,
    SentimentWord2: any,

    id: any
  }[] =
    [];

  TweetURlP: {
    Sentiment: any,
    SentimentWord: any,
    Sentiment2: any,
    SentimentWord2: any,

    id: any
  }[] =
    [];
  TweetURlN: {
    Sentiment: any,
    SentimentWord: any,
    Sentiment2: any,
    SentimentWord2: any,

    id: any
  }[] =
    [];
  TweetURlNE: {
    Sentiment: any,
    SentimentWord: any,
    Sentiment2: any,
    SentimentWord2: any,

    id: any
  }[] =
    [];

  lang: any = 'en';

  Sentiment: {
    totalResults: number,
    totalResultsP: number,
    totalResultsN: number,
    totalResultsNE: number,
    totalResultsP2: number,
    totalResultsN2: number,
    totalResultsNE2: number,
  } = {
      totalResults: 0,
      totalResultsP: 0,
      totalResultsN: 0,
      totalResultsNE: 0,
      totalResultsP2: 0,
      totalResultsN2: 0,
      totalResultsNE2: 0

    };

    //Start on Submit Function
  OnSubmit() {
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

    //initialize the pie chart 
    this.Data = { labels: ['Neutral', 'Postive', 'Negative'], datasets: [{ data: Array(3).fill(0), backgroundColor: ['rgba(0,124,255,1)', 'rgba(0,128,0,1)', 'rgba(255 , 0 , 0 ,1)'] }] };
    //check for the pattern of the query to detect the language
    if (this.regex.test(this.formData.Query)) {
      console.log('arabic');
      this.lang = 'ar';
    }

    //callback of the fetchtweets HTTP Request
    this.tweetservice.FetchTweets(this.formData.Query, this.formData.Counter, this.lang, this.FilterReTweets, this.FilterReplies).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.TweetURl = res;
        this.TweetURl.forEach(data => {
          if (data.Sentiment > 0 && data.Sentiment <= 0.5) {
            data.SentimentWord = 'Good';
          }
          else if (data.Sentiment > 0.5 && data.Sentiment <= 1) {
            data.SentimentWord = 'Very Good';
          }
          else if (data.Sentiment < 0 && data.Sentiment >= -0.5) {
            data.SentimentWord = 'Poor';
          }
          else if (data.Sentiment < -0.5 && data.Sentiment >= -1) {
            data.SentimentWord = 'Very Poor';
          }
          else {
            data.SentimentWord = 'Neutral'
          }
          if (data.Sentiment2 > 0 && data.Sentiment2 <= 0.5) {
            data.SentimentWord2 = 'Good';
          }
          else if (data.Sentiment2 > 0.5 && data.Sentiment2 <= 1) {
            data.SentimentWord2 = 'Very Good';
          }
          else if (data.Sentiment2 < 0 && data.Sentiment2 >= -0.5) {
            data.SentimentWord2 = 'Poor';
          }
          else if (data.Sentiment2 < -0.5 && data.Sentiment2 >= -1) {
            data.SentimentWord2 = 'Very Poor';
          }
          else {
            data.SentimentWord2 = 'Neutral'
          }


        });
        this.Sentiment.totalResults = this.TweetURl.length;
        this.Sentiment.totalResultsP = this.TweetURl.filter(it => it['Sentiment'] > 0 && it['Sentiment'] != 500).length;
        this.TweetURlP = this.TweetURl.filter(it => it['Sentiment'] > 0 && it['Sentiment'] != 500);
        this.Sentiment.totalResultsN = this.TweetURl.filter(it => it['Sentiment'] < 0).length;
        this.TweetURlN = this.TweetURl.filter(it => it['Sentiment'] < 0);
        this.Sentiment.totalResultsNE = this.TweetURl.filter(it => it['Sentiment'] == 0).length;
        this.TweetURlNE = this.TweetURl.filter(it => it['Sentiment'] == 0);
        this.Sentiment.totalResultsP2 = this.TweetURl.filter(it => it['Sentiment2'] > 0).length;
        this.Sentiment.totalResultsN2 = this.TweetURl.filter(it => it['Sentiment2'] < 0).length;
        this.Sentiment.totalResultsNE2 = this.TweetURl.filter(it => it['Sentiment2'] == 0).length;
        this.TweetURl = this.TweetURl.filter(it => it['Sentiment'] != 500);
        this.Data = { labels: ['Neutral', 'Postive', 'Negative'], datasets: [{ data: [this.Sentiment.totalResultsNE, this.Sentiment.totalResultsP, this.Sentiment.totalResultsN], backgroundColor: ['rgba(0,124,255,1)', 'rgba(0,128,0,1)', 'rgba(255 , 0 , 0 ,1)'] }] };

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

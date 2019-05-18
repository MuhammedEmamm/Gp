import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  providers: [NewsService],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  regex = new RegExp('^[\u0621-\u064A0-9 ]+$');
  constructor(private newservice: NewsService, private el: ElementRef) { }
  Data: {
    labels: any[],
    datasets: { data: any[], backgroundColor: any[] }[]
  };

  options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  type = 'pie';

  formData: {
    Query: any;
  } = { Query: '' };
  NewsData: {
    Sentiment: any,
    SentimentWord: any,
    author: any,
    content: any,
    description: any,
    publishedAt: any,
    source: { id: any, name: any },
    title: any,
    url: any,
    urlToImage: any
  }[] = [];
  NewsDataP: {
    Sentiment: any,
    SentimentWord: any,
    author: any,
    content: any,
    description: any,
    publishedAt: any,
    source: { id: any, name: any },
    title: any,
    url: any,
    urlToImage: any
  }[] = [];
  NewsDataN: {
    Sentiment: any,
    SentimentWord: any,
    author: any,
    content: any,
    description: any,
    publishedAt: any,
    source: { id: any, name: any },
    title: any,
    url: any,
    urlToImage: any
  }[] = [];
  NewsDataNE: {
    Sentiment: any,
    SentimentWord: any,
    author: any,
    content: any,
    description: any,
    publishedAt: any,
    source: { id: any, name: any },
    title: any,
    url: any,
    urlToImage: any
  }[] = [];
  totalResults: number = 0;
  totalResultsP: number = 0;
  totalResultsN: number = 0;
  totalResultsNE: number = 0;
  lang: any = 'en';
  submit: boolean = false;
  Type: any = 'top';
  Source: any = '';
  Country: any = '';
  Category: any = '';
  Sortby: any = 'publishedAt';
  Countries: {
    name: any,
    id: any
  }[] =
    [
      {
        name: 'ae',
        id: 'United Arab Emirates'
      },
      {
        name: 'ar',
        id: 'Argentina'

      },
      {
        name: 'at',
        id: 'Austria'
      },
      {
        name: 'au',
        id: 'Australia'
      },
      {
        name: 'be',
        id: 'Belgium'
      },
      {
        name: 'bg',
        id: 'Bulgaria'

      },
      {
        name: 'br',
        id: 'Brazil'

      },
      {
        name: 'ca',
        id: 'Canada'

      },
      {
        name: 'ch',
        id: 'Switzerland'

      },
      {
        name: 'cn',
        id: 'China'
      },
      {
        name: 'co',
        id: 'Colombia'
      },
      {
        name: 'cu',
        id: 'Cuba'
      },
      {
        name: 'cz',
        id: 'Czechia'
      },
      {
        name: 'de',
        id: 'Germany'
      },
      {
        name: 'eg',
        id: 'Egypt'
      },
      {
        name: 'fr',
        id: 'France'
      },
      {
        name: 'gb',
        id: 'United Kingdom'
      },
      {
        name: 'gr',
        id: 'Greece'
      },
      {
        name: 'hk',
        id: 'Hong Kong'
      },
      {
        name: 'hu',
        id: 'Hungary'
      },
      {
        name: 'id',
        id: 'Indonesia'
      },
      {
        name: 'ie',
        id: 'Ireland'
      },
      {
        name: 'il',
        id: 'Israel'
      },
      {
        name: 'in',
        id: 'India'
      },
      {
        name: 'it',
        id: 'Italy'
      },
      {
        name: 'jp',
        id: 'Japan'
      },
      {
        name: 'kr',
        id: 'Korea'
      },
      {
        name: 'lt',
        id: 'Lithuania'
      },
      {
        name: 'lv',
        id: 'Latvia'
      },
      {
        name: 'ma',
        id: 'Morocco'
      },
      {
        name: 'mx',
        id: 'Mexico'
      },
      {
        name: 'my',
        id: 'Malaysia'
      },
      {
        name: 'ng',
        id: 'Nigeria'
      },
      {
        name: 'nl',
        id: 'Netherlands'
      },
      {
        name: 'no',
        id: 'Norway'
      },
      {
        name: 'nz',
        id: 'New Zealand'
      },
      {
        name: 'ph',
        id: 'Philippines'
      },
      {
        name: 'pl',
        id: 'Poland'
      },
      {
        name: 'pt',
        id: 'Portugal'
      },
      {
        name: 'ro',
        id: 'Romania'
      },
      {
        name: 'rs',
        id: 'Serbia'
      },
      {
        name: 'ru',
        id: 'Russia'
      },
      {
        name: 'sa',
        id: 'Saudi Arabia'
      },
      {
        name: 'se',
        id: 'Sweden'
      },
      {
        name: 'sg',
        id: 'Singapore'
      },
      {
        name: 'si',
        id: 'Slovenia'
      },
      {
        name: 'sk',
        id: 'Slovakia'
      },
      {
        name: 'th',
        id: 'Thailand'
      },
      {
        name: 'tr',
        id: 'Turkey'
      },
      {
        name: 'tw',
        id: 'Taiwan'
      },
      {
        name: 'ua',
        id: 'Ukraine'
      },
      {
        name: 'us',
        id: 'United States'
      },
      {
        name: 've',
        id: 'Venezuela'
      },
      {
        name: 'za',
        id: 'South Africa'
      }]
  Sources: {
    category: any,
    id: any,
    country: any,
    name: any
  }[] = [];
  categories: {
    name: any
  }[] = [
      {
        name: 'business'
      },
      {
        name: 'entertainment'
      },
      {
        name: 'general'
      },
      {
        name: 'health'
      },
      {
        name: 'science'
      },
      {
        name: 'sports'
      },
      {
        name: 'technology'
      }];
  //Start On Submit Funciton
  OnSubmit() {

    //submit = true for showing the results section and pie charts on HTML
    this.submit = true;
    this.NewsData = [];

    //Show Pre-loader 
    if (document.getElementById('page-loader'))
      document.getElementById('page-loader').style.display = 'block';

    //check for the pattern of the query to detect the language
    if (this.regex.test(this.formData.Query)) {
      console.log('arabic');
      this.lang = 'ar';
    }

    //callback of the fetchNews HTTP Request
    this.newservice.FetchNews(this.formData.Query, this.lang, this.Type, this.Source, this.Country, this.Category, this.Sortby).subscribe((res: any) => {
      let e = this.el.nativeElement.querySelector('#search-results');
      e.scrollIntoView({ behavior: "smooth", block: "start" });
      if (document.getElementById('page-loader'))
        document.getElementById('page-loader').style.display = 'none';
      this.lang = 'en';
      if (res.status == 'ok') {
        this.NewsData = res.articles;
        this.NewsData.forEach(data => {
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

        });

        this.totalResultsP = this.NewsData.filter(it => it['Sentiment'] > 0 && it['Sentiment'] != 500).length;
        this.NewsDataP = this.NewsData.filter(it => it['Sentiment'] > 0 && it['Sentiment'] != 500);
        this.totalResultsN = this.NewsData.filter(it => it['Sentiment'] < 0).length;
        this.NewsDataN = this.NewsData.filter(it => it['Sentiment'] < 0);
        this.totalResultsNE = this.NewsData.filter(it => it['Sentiment'] == 0).length;
        this.NewsDataNE = this.NewsData.filter(it => it['Sentiment'] == 0);
        this.totalResults = this.totalResultsP + this.totalResultsN + this.totalResultsNE;
        this.NewsData = this.NewsData.filter(it => it['Sentiment'] != 500);
        this.Data = { labels: ['Neutral', 'Postive', 'Negative'], datasets: [{ data: [this.totalResultsNE, this.totalResultsP, this.totalResultsN], backgroundColor: ['rgba(0,124,255,1)', 'rgba(0,128,0,1)', 'rgba(255 , 0 , 0 ,1)'] }] };
      }

    });
  }
  //end onSubmit 
  updateUrl(event, index) {
    console.log(event);
    console.log(document.getElementById(`NewsImage${index}`));
    // document.getElementById(`NewsImage${index}`).src = 'https://www.ice-org.eu/Content/assets/img/default-news.png';

  }
  ngOnInit() {
    this.newservice.FetchSources().subscribe((res: any) => {
      console.log(res);
      if (res.status == 'ok') {
        this.Sources = res.sources;
      }
    });
  }

}

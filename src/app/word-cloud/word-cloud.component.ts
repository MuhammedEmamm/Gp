import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WordCloudService } from './word-cloud.service';

@Component({
  selector: 'app-word-cloud',
  templateUrl: './word-cloud.component.html',
  styleUrls: ['./word-cloud.component.css'],
  providers: [WordCloudService]
})
export class WordCloudComponent implements OnInit {
  @ViewChild('WordCloud') WordCloud: TemplateRef<any>;

  Countries: {
    name: any,
    id: any,
    lang: any
  }[] =
    [
      {
        name: 'ae',
        id: 'United Arab Emirates',
        lang: 'arabic'
      },
      {
        name: 'ar',
        id: 'Argentina',
        lang: 'spanish'
      },
      {
        name: 'at',
        id: 'Austria',
        lang: 'german'
      },
      {
        name: 'au',
        id: 'Australia',
        lang: 'english'
      },
      {
        name: 'be',
        id: 'Belgium',
        lang: 'french'
      },
      {
        name: 'bg',
        id: 'Bulgaria',
        lang: 'russian'
      },
      {
        name: 'br',
        id: 'Brazil',
        lang: 'portuguese'

      },
      {
        name: 'ca',
        id: 'Canada',
        lang: 'english'

      },
      {
        name: 'ch',
        id: 'Switzerland',
        lang: 'german'
      },
      {
        name: 'co',
        id: 'Colombia',
        lang: 'spanish'
      },
      {
        name: 'cu',
        id: 'Cuba',
        lang: 'spanish'
      },
      {
        name: 'de',
        id: 'Germany',
        lang: 'german'
      },
      {
        name: 'eg',
        id: 'Egypt',
        lang: 'arabic'
      },
      {
        name: 'fr',
        id: 'France',
        lang: 'french'
      },
      {
        name: 'gb',
        id: 'United Kingdom',
        lang: 'english'
      },
      {
        name: 'gr',
        id: 'Greece',
        lang: 'greek'

      },
      {
        name: 'hu',
        id: 'Hungary',
        lang: 'hungarian'
      },
      {
        name: 'id',
        id: 'Indonesia',
        lang: 'indonesian'
      },
      {
        name: 'ie',
        id: 'Ireland',
        lang: 'english'
      },
      {
        name: 'it',
        id: 'Italy',
        lang: 'italian'
      },
      {
        name: 'ma',
        id: 'Morocco',
        lang: 'french'
      },
      {
        name: 'mx',
        id: 'Mexico',
        lang: 'spanish'
      },
      {
        name: 'ng',
        id: 'Nigeria',
        lang: 'english'
      },
      {
        name: 'nl',
        id: 'Netherlands',
        lang: 'dutch'
      },
      {
        name: 'no',
        id: 'Norway',
        lang: 'norwegian'
      },
      {
        name: 'nz',
        id: 'New Zealand',
        lang: 'english'
      },

      {
        name: 'pt',
        id: 'Portugal',
        lang: 'portuguese'
      },
      {
        name: 'ro',
        id: 'Romania',
        lang: 'romanian'
      },
      {
        name: 'ru',
        id: 'Russia',
        lang: 'russian'
      },
      {
        name: 'sa',
        id: 'Saudi Arabia',
        lang: 'arabic'
      },
      {
        name: 'se',
        id: 'Sweden',
        lang: 'swedish'
      },
      {
        name: 'sg',
        id: 'Singapore',
        lang: 'english'
      },
      {
        name: 'tr',
        id: 'Turkey',
        lang: 'turkish'
      },
      {
        name: 'us',
        id: 'United States',
        lang: 'english'
      },
      {
        name: 'za',
        id: 'South Africa',
        lang: 'english'
      }]
  Country: any = '';
  Id: any = '';
  wordData: { size: any, text: any }[] = [];
  options: any = {};
  constructor(private modal: NgbModal, private wcservice: WordCloudService) {
    this.wordData = [
      { size: 1000, text: 'GoWriter' },
      { size: 1000, text: 'Angular' },
      { size: 1000, text: 'JAva script' },
      { size: 1000, text: 'ngServe' },
      { size: 1000, text: 'Int' },
      { size: 1000, text: 'CkEditor' },
      { size: 994, text: 'Ng Model' },
      { size: 993, text: 'Variable' },
      { size: 992, text: 'Class' },
      { size: 991, text: 'NgOnInit' },
      { size: 990, text: '@Input' },
      { size: 96, text: '@Output' },
      { size: 531, text: 'EventEmitter' },
      { size: 109, text: 'ChangeDetection' },
      { size: 500, text: 'Directives' },
      { size: 213, text: 'Services' },
      { size: 294, text: 'Component' },
      { size: 472, text: 'NgViewAfterInIt' },
      { size: 297, text: 'NgOnChanges' },
      { size: 456, text: 'NgBind' },
      { size: 123, text: 'NgTest' },
      { size: 376, text: 'Pipes' },
      { size: 93, text: 'Implements' },
      { size: 123, text: 'Assets' },
    ];

    this.options = {
      settings: {
        minFontSize: 30,
        maxFontSize: 150,
      },
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      labels: false // false to hide hover labels
    };
  }
  initWordCloud(id: any, name: any, lang: any) {
    this.Country = id;
    this.wordData = [];
    this.Id = name;
   //Show Pre-loader 
   if (document.getElementById('page-loader'))
   document.getElementById('page-loader').style.display = 'block';

    this.wcservice.GetWordCloud(name, lang).subscribe((res: any) => {
      console.log(res.tfidf) ; 
      let a : any[]= Object.keys(res.tfidf);
      console.log(a) ; 
      for (let i = 0; i < a.length; i++) {
        this.wordData.push({ size: (a.length - i), text: a[i] }) ; 
      }
      console.log(this.wordData) ;
      if (document.getElementById('page-loader'))
        document.getElementById('page-loader').style.display = 'none';
        
      this.modal.open(this.WordCloud, { size: 'lg' });

    });
  }
  ngOnInit() {
  }

}

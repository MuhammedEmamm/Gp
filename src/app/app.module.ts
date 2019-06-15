import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTweetModule } from "ngx-tweet";
import { ChartModule } from 'angular2-chartjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AgWordCloudModule} from 'angular4-word-cloud';


import { AppComponent } from './app.component';
import { TwitterComponent } from './twitter/twitter.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './page-components/header/header.component';
import { FooterComponent } from './page-components/footer/footer.component';
import { WordCloudComponent } from './word-cloud/word-cloud.component';
import { WordCloudService } from './word-cloud/word-cloud.service';
import { TwitterService } from './twitter/twitter.service';
import { NewsService } from './news/news.service';

@NgModule({
  declarations: [
    AppComponent,
    TwitterComponent,
    NewsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    WordCloudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxTweetModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartModule,
    NgbModule,
    AgWordCloudModule.forRoot()
  ],
  providers: [WordCloudService, TwitterService , NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

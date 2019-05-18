import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, EmailValidator, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTweetModule } from "ngx-tweet";
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { TwitterComponent } from './twitter/twitter.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './page-components/header/header.component';
import { FooterComponent } from './page-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TwitterComponent,
    NewsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxTweetModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  // controls = new x.TrackballControls();

  constructor(private el: ElementRef) {
    
    // this.Scene.add(this.stars);
  }
  
  ScrollUp() {
    let e = this.el.nativeElement.querySelector('#top');
    e.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  ngOnInit() {

  }
}

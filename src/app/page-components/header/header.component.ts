import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (): void => {
    if (window.pageYOffset > 0) {
      document.getElementById('fixed-header-dark').classList.add('fixed-header-dark');
      document.getElementById('head-line').classList.add('headitems');
      document.getElementById('head-tag').classList.add('headitems');
      document.getElementById('head-one').classList.add('headitems');
      document.getElementById('head-two').classList.add('headitems');
      document.getElementById('head-three').classList.add('headitems');
      document.getElementById('head-four').classList.add('headitems');

    }
    else {
      document.getElementById('fixed-header-dark').classList.remove('fixed-header-dark');
      document.getElementById('head-line').classList.remove('headitems');
      document.getElementById('head-tag').classList.remove('headitems');
      document.getElementById('head-one').classList.remove('headitems');
      document.getElementById('head-two').classList.remove('headitems');
      document.getElementById('head-three').classList.remove('headitems');
      document.getElementById('head-four').classList.remove('headitems');
      
    }
    if (window.pageYOffset > 500) {
      document.getElementById('scroll-up').style.display = 'block';

    }
    else {
      document.getElementById('scroll-up').style.display = 'none';

    }

  };


}

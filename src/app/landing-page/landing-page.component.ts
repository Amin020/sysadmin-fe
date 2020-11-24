import { Component, OnInit } from '@angular/core';
import { LandingPageService } from './landing-page.service'
import { LoaderService } from '../core/loader.service';
// import "https://code.jquery.com/jquery-3.3.1.min.js"
// import "./assets/js/jquery-2.2.4.min.js";
// import "./assets/js/popper.min.js"
// import "./assets/js/bootstrap.min.js"
// import "./assets/js/plugins.js"
// import "./assets/js/slick.min.js"
// import "./assets/js/footer-reveal.min.js"
// import "./assets/js/active.js"
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [LandingPageService]
})
export class LandingPageComponent implements OnInit {
  carouselList = [
    { src: './assets/images/1.svg', alt: 'slide 1' },
    { src: './assets/images/2.svg', alt: 'slide 2' },
    { src: './assets/images/4.svg', alt: ' slide 3' },
    { src: './assets/images/5.svg', alt: ' slide 4' },
    { src: './assets/images/6.svg', alt: ' slide 5' },
    { src: './assets/images/7.svg', alt: ' slide 6' },
    // { src: './assets/images/9.svg', alt: ' slide 7' }
  ]
  loadAPI: Promise<any>;
  isLoggedIn = false;
  productList = []; selectedProduct;
  constructor(private _landingService: LandingPageService, private loaderSerivce: LoaderService) {
    // this.loadAPI = new Promise((resolve) => {
    //   this.loadScript();
    //   resolve(true);
    // });
  }

  ngOnInit() {
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    this.getProductsList();
    window.addEventListener('scroll', this.scrollFunction);
  }
  scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById("navbar-custom").style.padding = "0";
    } else {
      document.getElementById("navbar-custom").style.padding = "10px 0";
    }
  }
  getProductsList() {
    this._landingService.getProductsList().subscribe((res: any) => {
      this.productList = res;
      this.selectedProduct = this.productList[0];
      this.loaderSerivce.isLoading.next(false);
    })
  }
  // public loadScript() {
  //   var isFound = false;
  //   var scripts = document.getElementsByTagName("script")
  //   for (var i = 0; i < scripts.length; ++i) {
  //     if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
  //       isFound = true;
  //     }
  //   }

  //   if (!isFound) {
  //     var dynamicScripts = [
  //       "./assets/css/styleother.css",
  //       "./assets/css/responsive.css",
  //       "./assets/css/normalize.min.css",
  //       "./assets/css/my-slider.css",
  //       "./assets/css/styleicon.css",
  //       "./assets/js/jquery-3.3.1.min.js",
  //       "./assets/js/bootstrap.min.js",
  //       "./assets/js/plugins.js",
  //       "./assets/js/my-slider.js",
  //       "./assets/js/active.js",
  //       "./assets/js/popper.min.js"
  //     ];

  //     for (var i = 0; i < dynamicScripts.length; i++) {
  //       let node = document.createElement('script');
  //       node.src = dynamicScripts[i];
  //       node.type = 'text/javascript';
  //       node.async = false;
  //       node.charset = 'utf-8';
  //       document.getElementsByTagName('head')[0].appendChild(node);
  //     }

  //   }
  // }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cs-footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  constructor(public navCtrl: NavController) {
  }

  toInfiniteScroll() {
    this.navCtrl.push('infinite-scroll')
  }

  toVirtualScroll() {
    this.navCtrl.push('Virtual-Scroll')
  }

  toHelloWord() {
    this.navCtrl.push('hello-word')
  }
}

import { NavController } from 'ionic-angular';
import { AuthenticatedServiceProvider } from './../../providers/authenticated-service/authenticated-service';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cs-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input()
  name: string;

  constructor(private authenticatedSvr: AuthenticatedServiceProvider, public navCtrl: NavController) {
  }
  logout() {
    this.authenticatedSvr.logout()
    this.navCtrl.setRoot('login')
  }
}

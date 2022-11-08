import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { BehaviorSubject } from 'rxjs';

/*
  Generated class for the AuthenticatedServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticatedServiceProvider {
  
  authState = new BehaviorSubject(false)
  
  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
    
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((res) => {
      if (res != null) {
        this.authState.next(true)
      }
    })
  }

  login(userName: string, password: string) {
    if (userName == 'Test' && password == '123') {
      this.storage.set('USER_INFO',userName).then(() => {
        this.authState.next(true)
      })
    }
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.authState.next(false)
    })
  }

  isAuthenticated() {
    return this.authState.value
  }

}

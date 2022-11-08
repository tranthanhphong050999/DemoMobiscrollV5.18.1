import { AuthenticatedServiceProvider } from './../../providers/authenticated-service/authenticated-service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "login",
  segment: "login"
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup
  formErrors: any = {
    userName: [],
    password: []
  }
  submitAtTemp: boolean = false
  
  constructor(public formBuilder: FormBuilder, public alertCtrl: AlertController, public navCtrl: NavController,private authenticatedSvr: AuthenticatedServiceProvider ) {
    this.loginForm = this.formBuilder.group({
      userName: ['',Validators.compose([Validators.required])],
      password: ['',Validators.compose([Validators.required])]
    })
  }

  login() {
    this.submitAtTemp = true
    this.formErrors.userName.pop()
    this.formErrors.password.pop()

    if (this.loginForm.valid) {
      let userName = this.loginForm.controls['userName'].value
      let password = this.loginForm.controls['password'].value
      this.authenticatedSvr.login(userName,password)
      if (this.authenticatedSvr.isAuthenticated) {
        this.navCtrl.setRoot('hello-word')
      } else {
        this.showError('login failed')
      }
    } else {
      if (this.submitAtTemp) {
        if (this.loginForm.controls['userName'].errors 
        && this.loginForm.controls['userName'].errors.required) {
          this.formErrors.userName.push('ユーザ名を入力してください。')
        }
        if (this.loginForm.controls['password'].errors 
        && this.loginForm.controls['password'].errors.required) {
          this.formErrors.password.push('パスワードを入力してください。')
        }
      }
    }
  }

  private showError(text: string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    })
    alert.present()
  }

  ionViewDidLoad() {
  }

}

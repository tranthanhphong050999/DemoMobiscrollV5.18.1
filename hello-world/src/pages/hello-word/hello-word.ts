import { TranslateService } from '@ngx-translate/core';
import { PostServiceProvider } from './../../providers/post-service/post-service';
import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/post';

/**
 * Generated class for the HelloWordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'hello-word',
  segment: 'hello-word'
})
@Component({
  selector: 'page-hello-word',
  templateUrl: 'hello-word.html',
})
export class HelloWordPage {
  
  name: string
  posts: Post[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private postSvr: PostServiceProvider, private translate: TranslateService,
    ) {
  }

  _valuephongtt = '12:00'

  get valuephongtt(): any {
    console.log("_value", this._valuephongtt);
    
    return this._valuephongtt;
  }

  set valuephongtt(val: any) {
    
  }

    date: Date | undefined;
    iso: string | undefined;
    momentJs: any;

    setDate(): void {
        this.date = new Date(2020, 10, 15, 10, 45);
    }

    setISO(): void {
        this.iso = '2020-05-20T12:30:00';
    }

    setMoment(): void {
        // make sure that moment js is loaded
        this.momentJs = this.momentJs([2020, 2, 6, 15, 30]);
    }

  ionViewWillEnter() {
    this.translate.use('ja')
    this.name= "POWER EGG"
    this.loadPosts()
  }

  private loadPosts() {
    this.postSvr.findPosts().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  } 

  changeName($event : any) {
    this.name = 'POWER EGG' + '(changed)'
  }
  
  viewDetail(id: string) {
    this.navCtrl.push('post-detail', {id}).then((err) => {
      if (!err) {
        this.navCtrl.setRoot('login')
      }
    })
  }

  toInfiniteScroll() {
    this.navCtrl.push('infinite-scroll')
  }

  toVirtualScroll() {
    this.navCtrl.push('Virtual-Scroll')
  }

  toCreatePost() {
    this.navCtrl.push('create-post').then((err) => {
      if (!err) {
        this.navCtrl.setRoot('login')
      }
    })
  }
}

import { PostServiceProvider } from './../../providers/post-service/post-service'
import { Post } from './../../model/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'

/**
 * Generated class for the VirtualScrollPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'Virtual-Scroll',
  segment: 'Virtual-Scroll'
})
@Component({
  selector: 'page-virtual-scroll-posts',
  templateUrl: 'virtual-scroll-posts.html',
})
export class VirtualScrollPostsPage {

  posts: Post[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private postSvr: PostServiceProvider ) {
  }

  ionViewWillEnter() {
    this.postSvr.findPosts().subscribe((posts: Post[]) => {
      this.posts = posts
    })
  }

  viewDetail(id: string) {
    this.navCtrl.push('post-detail', {id}).then((err) => {
      if (!err) {
        this.navCtrl.setRoot('login')
      }
    })
  }

  toCreatePost() {
    this.navCtrl.push('create-post').then((err) => {
      if (!err) {
        this.navCtrl.setRoot('login')
      }
    })
  }
}

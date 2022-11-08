import { PostServiceProvider } from './../../providers/post-service/post-service';
import { Post } from './../../model/post';
import { Component } from '@angular/core';
import { InfiniteScroll, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfiniteScrollPostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:"infinite-scroll",
  segment: "infinite-scroll"
})
@Component({
  selector: 'page-infinite-scroll-posts',
  templateUrl: 'infinite-scroll-posts.html',
})
export class InfiniteScrollPostsPage {

  posts: Post[] = []
  startPage: number = 0
  limit: number = 10

  constructor(public navCtrl: NavController, public navParams: NavParams, private postSvr: PostServiceProvider) {
  }

  ionViewWillEnter() {
    this.posts = []
    this.postSvr.findPostsInRange(this.startPage * this.limit, this.limit).subscribe((post: Post[]) => {
      this.posts.push(...post)
    })
  }

  loadMore(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.startPage++
      this.postSvr.findPostsInRange(this.startPage * this.limit, this.limit).subscribe((post: Post[]) => {
        this.posts.push(...post)
        infiniteScroll.complete()
      })
    }, 500)
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

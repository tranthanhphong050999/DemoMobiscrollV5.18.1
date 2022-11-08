import { AuthenticatedServiceProvider } from './../../providers/authenticated-service/authenticated-service';
import { PostServiceProvider } from './../../providers/post-service/post-service';
import { Post } from './../../model/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'post-detail',
  segment: 'post-detail'
})
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
  
  detailForm: FormGroup
  detailErrors: any = {
    postContent: [],
    postAuthor: [],
    postRegTime: []
  }
  post: Post
  id: string
  isSubmitButton : boolean = false

  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private postSvr: PostServiceProvider,
    private translate: TranslateService, private authenticatedSvr: AuthenticatedServiceProvider ) {
    this.detailForm = this.formBuilder.group({
      postContent: ['',Validators.compose([Validators.required])],
      postAuthor: ['',Validators.compose([Validators.required])],
      postRegTime: ['',Validators.compose([Validators.required])]
    })
  }

  ionViewWillEnter() {
    this.translate.use('ja')
    this.id = this.navParams.get('id')
    if (this.id === undefined) {
      this.navCtrl.setRoot('hello-word')
    } else {
      this.findByPostsId(this.id)
    }
  }

  ionViewCanEnter() : boolean {
    return this.authenticatedSvr.isAuthenticated()
  }

  back(): void {
    this.navCtrl.pop()
  }

  findByPostsId(id:string) {
    this.postSvr.findPostsId(id).subscribe((post: Post) => {
      this.post = post
      if (post == null) {
        this.navCtrl.pop()
      }
    })
  }

  deletePost(id: string) {
    this.postSvr.deletePosts(id).subscribe()
    this.findByPostsId(id)
  }

  editPost() {
    this.isSubmitButton = true
    this.detailErrors.postContent = []
    this.detailErrors.postAuthor = []
    this.detailErrors.postRegTime = []

    if (this.detailForm.valid) {
      this.post.content = this.detailForm.controls['postContent'].value
      this.post.author = this.detailForm.controls['postAuthor'].value
      this.post.regtime= this.detailForm.controls['postRegTime'].value
      console.log(this.post)
      this.postSvr.updatePosts(this.post).subscribe()
      this.navCtrl.pop()
    } else {
     if (this.isSubmitButton) {
       if (this.detailForm.controls['postContent'].errors
       && this.detailForm.controls['postContent'].errors.required) {
         this.detailErrors.postContent.push('Please Enter PostContent')
       }

       if (this.detailForm.controls['postAuthor'].errors
       && this.detailForm.controls['postAuthor'].errors.required) {
         this.detailErrors.postContent.push('Please Enter PostAuthor')
       }

       if (this.detailForm.controls['postRegTime'].errors
       && this.detailForm.controls['postRegTime'].errors.required) {
         this.detailErrors.postContent.push('Please Enter PostRegTime')
       }
     }
    }
  }
}

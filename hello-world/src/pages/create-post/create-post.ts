import { AuthenticatedServiceProvider } from './../../providers/authenticated-service/authenticated-service';
import { PostServiceProvider } from './../../providers/post-service/post-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from './../../model/post';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the CreatePostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'create-post',
  segment: 'create-post'
})
@Component({
  selector: 'page-create-post',
  templateUrl: 'create-post.html',
})
export class CreatePostPage {
  
  post: Post = {}
  insertForm:FormGroup
  isSubmitButton: boolean = false
  formError: any = {
    postTitle: [],
    postContent: [],
    postAuthor: [],
    postRegTime: []
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private postSvr: PostServiceProvider, public formBuilder: FormBuilder,
    private translate: TranslateService, private authenticatedSvr: AuthenticatedServiceProvider) {
    this.insertForm = this.formBuilder.group({
      postTitle: ['',Validators.compose([Validators.required])],
      postContent: ['',Validators.compose([Validators.required])],
      postAuthor: ['',Validators.compose([Validators.required])],
      postRegTime: ['',Validators.compose([Validators.required])]
    })
  }

  ionViewDidLoad() {
    this.translate.use('ja')
  }

  ionViewCanEnter() : boolean {
    return this.authenticatedSvr.isAuthenticated()
  }

  createPost() {
    this.isSubmitButton = true
    this.formError.postTitle = []
    this.formError.postContent = []
    this.formError.postAuthor = []
    this.formError.postRegTime = []

    if (this.insertForm.valid) {
    this.post.title = this.insertForm.controls['postTitle'].value
    this.post.content = this.insertForm.controls['postContent'].value
    this.post.author = this.insertForm.controls['postAuthor'].value
    this.post.regtime = this.insertForm.controls['postRegTime'].value
    this.postSvr.createPosts(this.post).subscribe((post: Post) => {
      if (post != null) {
        this.navCtrl.pop()
      }
    })
    } else {
      if (this.isSubmitButton) {
        if (this.insertForm.controls['postTitle'].errors
        && this.insertForm.controls['postTitle'].errors.required) {
          this.formError.postTitle.push('Please Enter Title')
        }
        
        if (this.insertForm.controls['postContent'].errors
        && this.insertForm.controls['postContent'].errors.required) {
          this.formError.postTitle.push('Please Enter Content')
        }

        if (this.insertForm.controls['postAuthor'].errors
        && this.insertForm.controls['postAuthor'].errors.required) {
          this.formError.postTitle.push('Please Enter Author')
        }

        if (this.insertForm.controls['postRegTime'].errors
        && this.insertForm.controls['postRegTime'].errors.required) {
          this.formError.postTitle.push('Please Enter RegTime')
        }
      }
    }
  }
}

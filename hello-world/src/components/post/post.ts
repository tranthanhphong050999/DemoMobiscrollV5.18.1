import { Post } from './../../model/post';
import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the PostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'cs-post',
  templateUrl: 'post.html'
})
export class PostComponent {
  
  @Input()
  item: Post
  @Output()
  selected: EventEmitter<any> = new EventEmitter<any>()

  constructor() {
  }
  fireCustomEvent() :void {
    this.selected.emit({data: this.item})
  }
}

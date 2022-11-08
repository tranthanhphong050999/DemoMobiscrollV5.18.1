import { ComponentsModule } from './../../components/components.module';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VirtualScrollPostsPage } from './virtual-scroll-posts';

@NgModule({
  declarations: [
    VirtualScrollPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(VirtualScrollPostsPage),
    PipesModule,
    ComponentsModule
  ],
})
export class VirtualScrollPostsPageModule {}

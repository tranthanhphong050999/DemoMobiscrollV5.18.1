import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelloWordPage } from './hello-word';
import { ComponentsModule } from '../../components/components.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MbscModule } from '@mobiscroll/angular';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [
    HelloWordPage,
  ],
  imports: [
    IonicPageModule.forChild(HelloWordPage),
    PipesModule,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MbscModule

  ],
})

export class HelloWordPageModule {}

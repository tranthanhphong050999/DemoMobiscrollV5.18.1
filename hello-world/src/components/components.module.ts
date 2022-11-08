import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post';
import { FooterComponent } from './footer/footer';
import { HeaderComponent } from './header/header';
@NgModule({
	declarations: [PostComponent,
    FooterComponent,
    HeaderComponent],
	imports: [PipesModule],
	exports: [PostComponent,
    FooterComponent,
    HeaderComponent]
})
export class ComponentsModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './component/post-list/post-list.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { PostCreatComponent } from './component/post-creat/post-creat.component';
import { PostEditComponent } from './component/post-edit/post-edit.component';
import { PaginationComponent } from './component/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailsComponent,
    PostCreatComponent,
    PostEditComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

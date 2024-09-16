import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { PostListComponent } from './component/post-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'post-details/:id', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

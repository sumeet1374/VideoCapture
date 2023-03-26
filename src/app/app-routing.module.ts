import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { VideocaptureComponent } from './videocapture/videocapture.component';

const routes: Routes = [{
  path:'',
  component:VideocaptureComponent
},
{
  path:'thumbnails',
  component:ThumbnailComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

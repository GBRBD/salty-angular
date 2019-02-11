import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoryCreateComponent } from './story/story-create/story-create.component';

const routes: Routes = [{ path: '', component: StoryCreateComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

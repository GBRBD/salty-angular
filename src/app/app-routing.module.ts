import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryListComponent } from './story/story-list/story-list.component';
import { CreateStoryComponent } from './create-story/create-story.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 's/create', component: CreateStoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

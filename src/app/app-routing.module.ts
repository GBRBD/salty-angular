import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryListComponent } from './story/story-list/story-list.component';
import { CreateStoryComponent } from './create-story/create-story.component';
import { EditStoryComponent } from './edit-story/edit-story.component';
import { StoryResolver } from './shared/resolvers/story.resolver';
import { AuthGuard } from './core/guards/guard';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  {
    path: 's/create',
    component: CreateStoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 's/edit/:id',
    component: EditStoryComponent,
    resolve: { story: StoryResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

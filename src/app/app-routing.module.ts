import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoryListComponent } from './story/story-list/story-list.component';
import { CreateStoryComponent } from './create-story/create-story.component';
import { EditStoryComponent } from './edit-story/edit-story.component';
import { AuthGuard } from './core/guards/guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { StoryResolver } from './core/resolvers/story.resolver';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 's/create',
    component: CreateStoryComponent
    // canActivate: [AuthGuard]
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

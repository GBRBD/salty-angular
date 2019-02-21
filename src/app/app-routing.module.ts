import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor/editor.component';
import { StoryListComponent } from './story/story-list/story-list.component';

const routes: Routes = [
  { path: '', component: StoryListComponent },
  { path: 's/create', component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

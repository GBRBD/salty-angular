import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { StoryListComponent } from './story-list/story-list.component';
import { MyStoriesComponent } from './my-stories/my-stories.component';

@NgModule({
  declarations: [StoryListComponent, MyStoriesComponent],
  imports: [SharedModule]
})
export class StoryModule {}

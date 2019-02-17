import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoryListComponent } from './story-list/story-list.component';

@NgModule({
  declarations: [StoryListComponent],
  imports: [SharedModule]
})
export class StoryModule {}

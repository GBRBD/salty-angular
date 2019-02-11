import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoryCreateComponent } from './story-create/story-create.component';

@NgModule({
  declarations: [StoryCreateComponent],
  imports: [SharedModule]
})
export class StoryModule {}

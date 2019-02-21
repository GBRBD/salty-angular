import { NgModule } from '@angular/core';
import { EditStoryComponent } from './edit-story.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [EditStoryComponent],
  imports: [SharedModule]
})
export class EditStoryModule {}

import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { EditStoryComponent } from './edit-story.component';

@NgModule({
  declarations: [EditStoryComponent],
  imports: [SharedModule]
})
export class EditStoryModule {}

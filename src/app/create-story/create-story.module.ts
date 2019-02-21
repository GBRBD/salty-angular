import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CreateStoryComponent } from './create-story.component';

@NgModule({
  declarations: [CreateStoryComponent],
  imports: [SharedModule]
})
export class CreateStoryModule {}

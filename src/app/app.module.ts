import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { StoryModule } from './story/story.module';
import { CreateStoryModule } from './create-story/create-story.module';
import { EditStoryModule } from './edit-story/edit-story.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoryModule,
    CreateStoryModule,
    EditStoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

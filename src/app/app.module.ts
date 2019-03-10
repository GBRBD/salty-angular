import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { StoryModule } from './story/story.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { EditStoryModule } from './edit-story/edit-story.module';
import { CreateStoryModule } from './create-story/create-story.module';

import { environment } from 'src/environments/environment';

import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    StoryModule,
    ProfileModule,
    EditStoryModule,
    CreateStoryModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

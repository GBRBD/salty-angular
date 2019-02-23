import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { StoriesService } from '../services/stories.service';

@Injectable({
  providedIn: 'root'
})
export class StoryResolver implements Resolve<any> {
  constructor(private storiesService: StoriesService) {}

  resolve() {
    return this.storiesService.getStories();
  }
}

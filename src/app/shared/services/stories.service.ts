import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor() {}

  createStory(story: Story) {
    console.log(story);
  }
}

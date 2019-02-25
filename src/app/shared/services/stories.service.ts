import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor(private http: HttpClient) {}

  createStory(story: Story) {
    return this.http.post<Story>('api/v1/stories/create', story);
  }

  getStories() {
    return this.http.get<Story[]>('api/v1/stories');
  }

  getStory(id: string) {
    return this.http.get<Story>(`api/v1/stories/${id}`);
  }

  editStory(story: Story) {
    return this.http.put<Story>('api/v1/stories/edit', story);
  }

  deleteStory(story: Story) {
    return this.http.post<Story>(`api/v1/stories/delete`, story);
  }
}

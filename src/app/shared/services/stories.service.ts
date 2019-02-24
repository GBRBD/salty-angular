import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor(private http: HttpClient) {}

  createStory(story: Story) {
    return this.http.post<Story>(
      'http://localhost:3000/api/v1/stories/create',
      story
    );
  }

  getStories() {
    return this.http.get<Story[]>('http://localhost:3000/api/v1/stories');
  }

  getStory(id: string) {
    return this.http.get<Story>(`http://localhost:3000/api/v1/stories/${id}`);
  }

  editStory(story: Story) {
    return this.http.put<Story>(
      'http://localhost:3000/api/v1/stories/edit',
      story
    );
  }
}

import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor(private http: HttpClient) {}

  createStory(story: Story) {
    console.log('creating story', story.title);
    return this.http.post<Story>('api/v1/stories/create', story);
  }

  getStories() {
    return this.http.get<Story[]>('api/v1/stories').pipe(take(1));
  }

  getStory(id: string) {
    return this.http.get<Story>(`api/v1/stories/${id}`).pipe(take(1));
  }

  editStory(story: Story) {
    return this.http.put<Story>('api/v1/stories/edit', story);
  }

  deleteStory(story: Story) {
    return this.http.delete<Story>(`api/v1/stories/delete/${story._id}`);
  }
}

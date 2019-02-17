import { Injectable } from '@angular/core';
import { Story } from '../models/story.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor(private http: HttpClient, private router: Router) {}

  createStory(story: Story) {
    this.http
      .post<Story>('http://localhost:3000/api/story', story)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }
}

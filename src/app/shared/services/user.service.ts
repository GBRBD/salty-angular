import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { Story } from '../models/story.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public http: HttpClient) {}

  saveUser(user: User) {
    return this.http.post('api/v1/user/create', user);
  }

  getUserFromDatabase() {
    return this.http.get('api/v1/user').pipe(take(1));
  }

  getUserStories() {
    return this.http.get<Story[]>(`api/v1/user/stories`).pipe(take(1));
  }

  updateEmail(email: string) {
    return this.http.put<string>('api/v1/user/updateemail', { email });
  }

  updateUsername(username: string) {
    return this.http.put<string>('api/v1/user/updateusername', { username });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public http: HttpClient) {}

  saveUser(user: User) {
    return this.http.post('api/v1/user/create', user);
  }
}

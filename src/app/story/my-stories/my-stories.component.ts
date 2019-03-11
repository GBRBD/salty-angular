import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Story } from 'src/app/shared/models/story.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-my-stories',
  templateUrl: './my-stories.component.html',
  styleUrls: ['./my-stories.component.scss']
})
export class MyStoriesComponent implements OnInit {
  stories$: Observable<Story[]>;

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.stories$ = this.userService.getUserStories();
  }
}

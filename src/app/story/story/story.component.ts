import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Story } from 'src/app/shared/models/story.model';
import { StoriesService } from 'src/app/shared/services/stories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  story$: Observable<Story>;

  constructor(
    public storiesService: StoriesService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.story$ = this.storiesService.getStory(
      this.activatedRoute.snapshot.params.id
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { StoriesService } from 'src/app/shared/services/stories.service';

@Injectable({
  providedIn: 'root'
})
export class StoryResolver implements Resolve<any> {
  constructor(private storiesService: StoriesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.storiesService.getStory(route.params.id);
  }
}

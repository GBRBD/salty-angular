import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { Story } from 'src/app/shared/models/story.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { StoriesService } from 'src/app/shared/services/stories.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {
  user: User;
  story$: Observable<Story>;
  commentForm: FormGroup;
  private commentSub: Subscription;

  constructor(
    public storiesService: StoriesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    public helperService: HelperService
  ) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.story$ = this.storiesService.getStory(
      this.activatedRoute.snapshot.params.id
    );
    this.initializeCommentForm();
  }

  ngOnDestroy() {
    if (this.commentSub) {
      this.commentSub.unsubscribe();
    }
  }

  onCommentSubmit() {
    console.log(this.comment.value);
  }

  private initializeCommentForm() {
    this.commentForm = this.fb.group({
      comment: this.initCommentField()
    });
  }

  private initCommentField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(4), Validators.maxLength(140)]
    ];
  }

  get comment() {
    return this.commentForm.get('comment');
  }
}

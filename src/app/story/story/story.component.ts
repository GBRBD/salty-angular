import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';

import { User } from 'src/app/shared/models/user.model';
import { Story } from 'src/app/shared/models/story.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { StoriesService } from 'src/app/shared/services/stories.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit, OnDestroy {
  @ViewChild('commentFormDirective') commentFormDirective: FormGroupDirective;
  user: User;
  story$: Observable<Story>;
  commentForm: FormGroup;
  private commentSub: Subscription;
  private getUsernameSub: Subscription;

  constructor(
    public storiesService: StoriesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public authService: AuthService,
    public helperService: HelperService,
    private userService: UserService
  ) {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.getUsernameSub = this.userService
      .getUserFromDatabase()
      .subscribe((user: User) => {
        this.user.username = user.username;
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
    if (this.getUsernameSub) {
      this.getUsernameSub.unsubscribe();
    }
  }

  onCommentSubmit() {
    this.addComment();
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

  private addComment() {
    const reqBody = {
      comment: this.comment.value,
      username: this.user.username
    };
    this.commentSub = this.storiesService
      .commentStory(this.activatedRoute.snapshot.params.id, reqBody)
      .subscribe(
        data => {
          this.helperService.showSnackBar(
            this.helperService.messages.commentAdded
          );
          this.helperService.resetForm(
            this.commentForm,
            this.commentFormDirective
          );
          this.ngOnInit();
        },
        error =>
          this.helperService.showSnackBar(
            this.helperService.messages.tryAgainLater
          )
      );
  }

  get comment() {
    return this.commentForm.get('comment');
  }
}

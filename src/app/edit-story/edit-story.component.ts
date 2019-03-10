import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Story } from '../shared/models/story.model';
import { StoriesService } from '../shared/services/stories.service';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit, OnDestroy {
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  editForm: FormGroup;
  errorMessages = {
    emptyTitleError: 'Please enter a story title!',
    tooLongTitleError: 'Title is too long! Max 140 character!',
    emptyContentError: 'Please write a story!',
    tooLongContentError: 'Story is too long! Max 10000 character!'
  };
  private editeSub: Subscription;
  private deleteSub: Subscription;
  story: Story;

  constructor(
    private fb: FormBuilder,
    public storiesService: StoriesService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.resolveStory();
  }

  ngOnInit() {
    this.initializeForm();
  }

  ngOnDestroy() {
    if (this.editeSub) {
      this.editeSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

  onSubmit() {
    this.submitForm();
    this.resetForm();
  }

  onDelete() {
    this.deleteStory();
  }

  private resolveStory() {
    this.story = this.activatedRoute.snapshot.data.story;
  }

  private initializeForm() {
    this.editForm = this.fb.group({
      title: this.initTitleField(),
      content: this.initContentField()
    });
  }

  private initTitleField(): any {
    return [
      this.story.title,
      [Validators.required, Validators.minLength(3), Validators.maxLength(140)]
    ];
  }

  private initContentField(): any {
    return [
      this.story.content,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10000)
      ]
    ];
  }

  private submitForm() {
    if (this.editForm.invalid) {
      return;
    }
    const story: Story = {
      _id: this.story._id,
      title: this.editForm.value.title,
      content: this.editForm.value.content,
      uid: this.story.uid
    };
    this.editeSub = this.storiesService.editStory(story).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private resetForm() {
    this.editForm.reset();
    this.formDirective.resetForm();
  }

  private deleteStory() {
    this.deleteSub = this.storiesService
      .deleteStory(this.story)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}

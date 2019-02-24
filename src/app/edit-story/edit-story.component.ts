import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { StoriesService } from '../shared/services/stories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Story } from '../shared/models/story.model';

@Component({
  selector: 'app-edit-story',
  templateUrl: './edit-story.component.html',
  styleUrls: ['./edit-story.component.scss']
})
export class EditStoryComponent implements OnInit {
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  editForm: FormGroup;
  errorMessages = {
    emptyTitleError: 'Please enter a story title!',
    tooLongTitleError: 'Title is too long! Max 140 character!',
    emptyContentError: 'Please write a story!',
    tooLongContentError: 'Story is too long! Max 10000 character!'
  };

  story: Story;

  constructor(
    private fb: FormBuilder,
    public storiesService: StoriesService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.story = this.activatedRoute.snapshot.data.story;
  }

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.submitForm();
    this.resetForm();
  }

  onDelete() {
    this.storiesService.deleteStory(this.story).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private initializeForm() {
    this.editForm = this.fb.group({
      title: [
        this.story.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(140)
        ]
      ],
      content: [
        this.story.content,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10000)
        ]
      ]
    });
  }

  private submitForm() {
    if (this.editForm.invalid) {
      return;
    }
    const story: Story = {
      _id: this.story._id,
      title: this.editForm.value.title,
      content: this.editForm.value.content
    };
    this.storiesService.editStory(story).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  private resetForm() {
    this.editForm.reset();
    this.formDirective.resetForm();
  }
}

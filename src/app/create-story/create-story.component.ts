import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { StoriesService } from '../shared/services/stories.service';
import { Story } from '../shared/models/story.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent implements OnInit {
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  createForm: FormGroup;
  errorMessages = {
    emptyTitleError: 'Please enter a story title!',
    tooLongTitleError: 'Title is too long! Max 140 character!',
    emptyContentError: 'Please write a story!',
    tooLongContentError: 'Story is too long! Max 10000 character!'
  };

  constructor(
    private fb: FormBuilder,
    public storiesService: StoriesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.submitForm();
    this.resetForm();
  }

  private initializeForm() {
    this.createForm = this.fb.group({
      title: this.initTitleField(),
      content: this.initContentField()
    });
  }

  private initContentField(): any {
    return [
      null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10000)
      ]
    ];
  }

  private initTitleField(): any {
    return [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(140)]
    ];
  }

  private submitForm() {
    if (this.createForm.invalid) {
      return;
    }
    const story: Story = {
      title: this.createForm.value.title,
      content: this.createForm.value.content
    };
    this.storiesService
      .createStory(story)
      .subscribe(() => this.router.navigate(['/']));
  }

  private resetForm() {
    this.createForm.reset();
    this.formDirective.resetForm();
  }
}

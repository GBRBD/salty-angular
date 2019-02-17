import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { StoriesService } from '../shared/services/stories.service';
import { Story } from '../shared/models/story.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('formDirective') formDirective: FormGroupDirective;
  storyForm: FormGroup;
  errorMessages = {
    emptyTitleError: 'Please enter a story title!',
    tooLongTitleError: 'Title is too long! Max 140 character!',
    emptyContentError: 'Please write a story!',
    tooLongContentError: 'Story is too long! Max 10000 character!'
  };

  constructor(private fb: FormBuilder, public storiesService: StoriesService) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.submitForm();
    this.resetForm();
  }

  private initializeForm() {
    this.storyForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(140)
        ]
      ],
      content: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10000)
        ]
      ]
    });
  }

  private submitForm() {
    if (this.storyForm.invalid) {
      return;
    }
    const story: Story = {
      title: this.storyForm.value.title,
      content: this.storyForm.value.content
    };
    this.storiesService.addStory(story);
  }

  private resetForm() {
    this.storyForm.reset();
    this.formDirective.resetForm();
  }
}

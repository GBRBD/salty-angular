import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroupDirective,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { StoriesService } from '../shared/services/stories.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Story } from '../shared/models/story.model';
import { createScope } from '@angular/core/src/profile/wtf_impl';

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
    public activatedRoute: ActivatedRoute
  ) {
    this.story = this.activatedRoute.snapshot.data.story;
  }

  ngOnInit() {
    console.log(this.story);
    this.initializeForm();
  }

  onSubmit() {
    // this.submitForm();
    // this.resetForm();
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

  // private getStoryData() {
  //   const storyId = this.activatedRoute.snapshot.params.id;
  //   this.storiesService.getStory(storyId).subscribe((storyData: Story) => {
  //     this.editForm.setValue({
  //       title: storyData.title,
  //       content: storyData.content
  //     });
  //   });
  // }
}

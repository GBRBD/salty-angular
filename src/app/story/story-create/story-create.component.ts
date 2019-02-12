import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-story-create',
  templateUrl: './story-create.component.html',
  styleUrls: ['./story-create.component.scss']
})
export class StoryCreateComponent implements OnInit {
  createStoryForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.createStoryForm = this.fb.group({
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
}

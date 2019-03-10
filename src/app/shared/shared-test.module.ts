import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from './shared.module';

@NgModule({
  declarations: [],
  exports: [
    SharedModule,
    RouterTestingModule,
    ReactiveFormsModule,
    HttpClientTestingModule
  ]
})
export class SharedTestModule {}

import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatBadgeModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  exports: [
    MatTabsModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule {}

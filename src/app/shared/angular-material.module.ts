import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatBadgeModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    MatFormFieldModule
  ]
})
export class AngularMaterialModule {}

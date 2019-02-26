import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, AngularFireAuthModule],
  exports: [HeaderComponent]
})
export class CoreModule {}

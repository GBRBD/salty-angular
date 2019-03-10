import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { SharedModule } from '../shared/shared.module';
import { SecurityComponent } from './security/security.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, SecurityComponent],
  imports: [SharedModule]
})
export class AuthModule {}

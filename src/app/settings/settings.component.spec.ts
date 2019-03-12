import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { SharedTestModule } from '../shared/shared-test.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HelperService } from '../shared/services/helper.service';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedTestModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      declarations: [SettingsComponent],
      providers: [AuthService, UserService, HelperService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

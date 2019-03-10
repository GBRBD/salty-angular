import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityComponent } from './security.component';
import { SharedTestModule } from 'src/app/shared/shared-test.module';

describe('SecurityComponent', () => {
  let component: SecurityComponent;
  let fixture: ComponentFixture<SecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedTestModule],
      declarations: [SecurityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

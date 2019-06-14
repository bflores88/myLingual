import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavMobileComponent } from './profile-nav-mobile.component';

describe('ProfileNavMobileComponent', () => {
  let component: ProfileNavMobileComponent;
  let fixture: ComponentFixture<ProfileNavMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileNavMobileComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNavMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

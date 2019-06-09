import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBrowserComponent } from './nav-browser.component';

describe('NavBrowserComponent', () => {
  let component: NavBrowserComponent;
  let fixture: ComponentFixture<NavBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

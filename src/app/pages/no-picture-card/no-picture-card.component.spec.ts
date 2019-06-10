import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPictureComponent } from './no-picture-card.component';

describe('NoPictureComponent', () => {
  let component: NoPictureComponent;
  let fixture: ComponentFixture<NoPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

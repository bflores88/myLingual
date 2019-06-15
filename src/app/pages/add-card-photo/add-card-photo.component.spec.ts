import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardPhotoComponent } from './add-card-photo.component';

describe('AddCardPhotoComponent', () => {
  let component: AddCardPhotoComponent;
  let fixture: ComponentFixture<AddCardPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

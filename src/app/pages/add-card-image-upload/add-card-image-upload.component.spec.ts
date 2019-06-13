import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardImageUploadComponent } from './add-card-image-upload.component';

describe('AddCardImageUploadComponent', () => {
  let component: AddCardImageUploadComponent;
  let fixture: ComponentFixture<AddCardImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

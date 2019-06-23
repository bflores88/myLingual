import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardUploadComponent } from './add-card-upload.component';

describe('AddCardUploadComponent', () => {
  let component: AddCardUploadComponent;
  let fixture: ComponentFixture<AddCardUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCardUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

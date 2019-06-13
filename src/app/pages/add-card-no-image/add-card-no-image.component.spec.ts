import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardNoImageComponent } from './add-card-no-image.component';

describe('AddCardNoImageComponent', () => {
  let component: AddCardNoImageComponent;
  let fixture: ComponentFixture<AddCardNoImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCardNoImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardNoImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

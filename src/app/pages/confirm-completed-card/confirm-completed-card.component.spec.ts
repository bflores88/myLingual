import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCompletedCardComponent } from './confirm-completed-card.component';

describe('ConfirmCompletedCardComponent', () => {
  let component: ConfirmCompletedCardComponent;
  let fixture: ComponentFixture<ConfirmCompletedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmCompletedCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmCompletedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

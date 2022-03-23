import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInviteComponent } from './new-invite.component';

describe('NewInviteComponent', () => {
  let component: NewInviteComponent;
  let fixture: ComponentFixture<NewInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewInviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

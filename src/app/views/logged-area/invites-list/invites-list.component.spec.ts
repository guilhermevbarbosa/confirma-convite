import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesListComponent } from './invites-list.component';

describe('InvitesListComponent', () => {
  let component: InvitesListComponent;
  let fixture: ComponentFixture<InvitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

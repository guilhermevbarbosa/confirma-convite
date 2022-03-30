import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedPagesLayoutComponent } from './logged-pages-layout.component';

describe('LoggedPagesLayoutComponent', () => {
  let component: LoggedPagesLayoutComponent;
  let fixture: ComponentFixture<LoggedPagesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedPagesLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedPagesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

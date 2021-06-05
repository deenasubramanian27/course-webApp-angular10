import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeListComponent } from './user-home-list.component';

describe('UserHomeListComponent', () => {
  let component: UserHomeListComponent;
  let fixture: ComponentFixture<UserHomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHomeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

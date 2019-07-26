import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHouseComponent } from './booking-house.component';

describe('BookingHouseComponent', () => {
  let component: BookingHouseComponent;
  let fixture: ComponentFixture<BookingHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

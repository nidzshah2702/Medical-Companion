import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmedicationComponent } from './addmedication.component';

describe('AddmedicationComponent', () => {
  let component: AddmedicationComponent;
  let fixture: ComponentFixture<AddmedicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmedicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

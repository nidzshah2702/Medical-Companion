import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MymedicationComponent } from './mymedication.component';

describe('MymedicationComponent', () => {
  let component: MymedicationComponent;
  let fixture: ComponentFixture<MymedicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MymedicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MymedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

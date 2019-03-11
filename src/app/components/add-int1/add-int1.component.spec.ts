import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInt1Component } from './add-int1.component';

describe('AddInt1Component', () => {
  let component: AddInt1Component;
  let fixture: ComponentFixture<AddInt1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInt1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInt2Component } from './add-int2.component';

describe('AddInt2Component', () => {
  let component: AddInt2Component;
  let fixture: ComponentFixture<AddInt2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInt2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

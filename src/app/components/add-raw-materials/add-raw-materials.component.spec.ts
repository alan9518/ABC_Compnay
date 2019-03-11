import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRawMaterialsComponent } from './add-raw-materials.component';

describe('AddRawMaterialsComponent', () => {
  let component: AddRawMaterialsComponent;
  let fixture: ComponentFixture<AddRawMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRawMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRawMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

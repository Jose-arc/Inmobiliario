import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOferenteComponent } from './add-oferente.component';

describe('AddOferenteComponent', () => {
  let component: AddOferenteComponent;
  let fixture: ComponentFixture<AddOferenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOferenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

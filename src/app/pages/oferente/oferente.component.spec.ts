import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OferenteComponent } from './oferente.component';

describe('OferenteComponent', () => {
  let component: OferenteComponent;
  let fixture: ComponentFixture<OferenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OferenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

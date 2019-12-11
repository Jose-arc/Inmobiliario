import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategoriaoferenteComponent } from './listcategoriaoferente.component';

describe('ListcategoriaoferenteComponent', () => {
  let component: ListcategoriaoferenteComponent;
  let fixture: ComponentFixture<ListcategoriaoferenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcategoriaoferenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategoriaoferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

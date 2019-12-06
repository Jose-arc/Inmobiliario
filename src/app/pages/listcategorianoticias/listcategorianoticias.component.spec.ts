import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcategorianoticiasComponent } from './listcategorianoticias.component';

describe('ListcategorianoticiasComponent', () => {
  let component: ListcategorianoticiasComponent;
  let fixture: ComponentFixture<ListcategorianoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcategorianoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcategorianoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

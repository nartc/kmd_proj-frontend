import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementShellComponent } from './element-shell.component';

describe('ElementShellComponent', () => {
  let component: ElementShellComponent;
  let fixture: ComponentFixture<ElementShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

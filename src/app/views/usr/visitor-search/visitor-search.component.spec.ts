import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorSearchComponent } from './visitor-search.component';

describe('VisitorSearchComponent', () => {
  let component: VisitorSearchComponent;
  let fixture: ComponentFixture<VisitorSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAddCourseComponent } from './faculty-add-course.component';

describe('FacultyAddCourseComponent', () => {
  let component: FacultyAddCourseComponent;
  let fixture: ComponentFixture<FacultyAddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyAddCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyAddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Comment } from '../../comment/comment.model';
import { AuthenticationService } from '../../user/authentication.service';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be author for guests', inject([AuthenticationService], (service: AuthenticationService) => {
    service.logout();
    expect(component.isAuthor(new Comment(0, 'another author', 'comment title', 'comment body'))).toBeFalsy();
  }));

  it('should add new comment to task', () => {
    const newComment = new Comment(1, 'actual author', 'the title', 'the body');
    const index = component._task.comments.indexOf(newComment);
    if (index > -1) {component._task.comments.splice(index, 1); }
    component.newCommentAdded(newComment);
    expect(component._task.comments.indexOf(newComment)).toBeGreaterThan(0);
  });

  it('should render title in a h1 tag', async(() => {
    expect(fixture.debugElement.nativeElement.querySelector('h2').textContent).toContain(component._task.title);
  }));

});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEventFormComponent } from './game-event-form.component';

describe('GameEventFormComponent', () => {
  let component: GameEventFormComponent;
  let fixture: ComponentFixture<GameEventFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameEventFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

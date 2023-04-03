import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerLoginFormComponent } from './player-login-form.component';

describe('PlayerLoginFormComponent', () => {
  let component: PlayerLoginFormComponent;
  let fixture: ComponentFixture<PlayerLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

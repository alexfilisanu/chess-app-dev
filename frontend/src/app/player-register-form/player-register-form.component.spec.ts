import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRegisterFormComponent } from './player-register-form.component';

describe('PlayerRegisterFormComponent', () => {
  let component: PlayerRegisterFormComponent;
  let fixture: ComponentFixture<PlayerRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerRegisterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

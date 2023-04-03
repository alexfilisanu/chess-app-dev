import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerLoginFormComponent } from './player-login-form/player-login-form.component';
import { PlayerRegisterFormComponent } from './player-register-form/player-register-form.component';

const routes: Routes = [
  { path: 'login', component: PlayerLoginFormComponent },
  { path: 'register', component: PlayerRegisterFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

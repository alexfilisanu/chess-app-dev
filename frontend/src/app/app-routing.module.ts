import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component'
import { PlayerLoginFormComponent } from './player-login-form/player-login-form.component';
import { PlayerRegisterFormComponent } from './player-register-form/player-register-form.component';
import { RegisterSuccessfulComponent } from './register-successful/register-successful.component';
import { ClientHomepageComponent } from './client-homepage/client-homepage.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';

const routes: Routes = [
    { path: '', component: PlayerListComponent },
    { path: 'login', component: PlayerLoginFormComponent },
    { path: 'register', component: PlayerRegisterFormComponent },
    { path: 'register-successful', component: RegisterSuccessfulComponent },
    { path: 'client-homepage', component: ClientHomepageComponent},
    { path: 'chess-board', component: ChessBoardComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

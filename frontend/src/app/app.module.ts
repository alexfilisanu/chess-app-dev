import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerLoginFormComponent } from './player-login-form/player-login-form.component';
import { PlayerRegisterFormComponent } from './player-register-form/player-register-form.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerServiceService } from './player-service/player-service.service';
import { RegisterSuccessfulComponent } from './register-successful/register-successful.component';
import { ClientHomepageComponent } from './client-homepage/client-homepage.component';
import { ChessBoardComponent } from './chess-board/chess-board.component';
import { NgxChessBoardModule } from "ngx-chess-board";

@NgModule({
    declarations: [
        AppComponent,
        PlayerLoginFormComponent,
        PlayerRegisterFormComponent,
        PlayerListComponent,
        RegisterSuccessfulComponent,
        ClientHomepageComponent,
        ChessBoardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
         NgxChessBoardModule.forRoot()
    ],
    providers: [PlayerServiceService],
    bootstrap: [AppComponent]
})

export class AppModule {
}

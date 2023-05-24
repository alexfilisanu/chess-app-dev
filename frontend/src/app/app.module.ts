import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { KnightComponent } from './knight/knight.component';
import { SquareComponent } from './square/square.component';
import { GameService } from './game-service/game.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PawnComponent } from './pawn/pawn.component';
import { RookComponent } from './rook/rook.component';
import { BishopComponent } from './bishop/bishop.component';
import { QueenComponent } from './queen/queen.component';
import { KingComponent } from './king/king.component';
import { WebSocketsService } from './websockets-service/websockets.service';
import { AppConfig } from './app.config';

@NgModule({
    declarations: [
        AppComponent,
        PlayerLoginFormComponent,
        PlayerRegisterFormComponent,
        PlayerListComponent,
        RegisterSuccessfulComponent,
        ClientHomepageComponent,
        ChessBoardComponent,
        KnightComponent,
        SquareComponent,
        PawnComponent,
        RookComponent,
        BishopComponent,
        QueenComponent,
        KingComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        BrowserAnimationsModule,
        DragDropModule
    ],
    providers: [
        PlayerServiceService,
        GameService,
        WebSocketsService,
        AppConfig
        ],
    bootstrap: [AppComponent]
})

export class AppModule {
}

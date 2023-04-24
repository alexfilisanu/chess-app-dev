import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxChessBoardService } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {
  constructor(private router: Router, private ngxChessBoardService: NgxChessBoardService) {
    }
     ngOnInit() {

     }
}

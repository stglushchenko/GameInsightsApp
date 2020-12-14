import { GameService } from './../services/game.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../models';

@Component({
  selector: 'app-game',
  templateUrl: './game-events.component.html',
  styleUrls: ['./game-events.component.css']
})
export class GameEventsComponent implements OnInit {
  gameId: number;
  game$: Observable<Game>;

  constructor(private route: ActivatedRoute, private gameService: GameService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.gameId = +params.get('id');
      this.game$ = this.gameService.get(this.gameId);
    });
  }

}

import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game, GameEvent, GameEventType } from '../models';
import { GameEventService, GameService } from '../services';

@Component({
  selector: 'app-game',
  templateUrl: './game-events.component.html',
  styleUrls: ['./game-events.component.css']
})
export class GameEventsComponent implements OnInit {
  gameId: number;
  game: Game;
  gameEvents$: Observable<GameEvent[]>;
  GameEventType = GameEventType;
  selectedEvent?: number;

  constructor(private route: ActivatedRoute, private gameService: GameService, private gameEventService: GameEventService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.gameId = +params.get('id');
      this.gameService.get(this.gameId).subscribe(x => this.game = x);
      this.gameEvents$ = this.gameEventService.getAll(this.gameId);
    });
  }

  getDescription(gameEvent: GameEvent) {
    console.log(GameEventType[gameEvent.eventType]);
    return GameEventType[gameEvent.eventType];
  }

  selectEvent(eventId?: number){
    this.selectedEvent = eventId;
  }

}

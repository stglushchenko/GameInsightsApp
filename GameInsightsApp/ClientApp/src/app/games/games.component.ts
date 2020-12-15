import { GameService } from './../services/game.service';
import { Component } from '@angular/core';
import { Game } from "../models/game";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent {
  public games: Game[];
  public error: any;

  constructor(gameService: GameService) {
    gameService.getAll().subscribe(result => {
      this.games = result;
    }, error => this.onError(error));
  }

  onError(error: any) {
    console.error(error);
    this.error = error;
  }

  gameDescription(game: Game): string{
    return `Teams: ${game.teams.map(x => `${x.name}(${x.players.length} players)`).join(', ')}`;
  }
}


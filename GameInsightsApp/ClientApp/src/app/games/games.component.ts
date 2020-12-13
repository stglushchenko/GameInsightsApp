import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from "../models/game";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html'
})
export class GamesComponent {
  public games: Game[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Game[]>(baseUrl + 'games').subscribe(result => {
      this.games = result;
    }, error => console.error(error));
  }

  onSelect(game: Game) {
    console.log(game);
  }
}


import { GameEventService } from './../services/game-event.service';
import { GameEventType } from './../models/game-event';
import { GameService } from './../services/game.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, Player } from '../models';
import { skipUntil, skipWhile, take, takeUntil, tap, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-game-event-form',
  templateUrl: './game-event-form.component.html',
  styleUrls: ['./game-event-form.component.css']
})
export class GameEventFormComponent implements OnDestroy {
  private unsubscribed$ = new Subject();
  game: Game;
  selectedTeamPlayers$: Observable<Player[]>;
  eventTypes = [
    {type: GameEventType.CapturedTheFlag, name: 'Captured the flag'},
    {type: GameEventType.FlagInterceptedByAnotherTeam, name: 'Flag intercepted by another team'},
    {type: GameEventType.FlagIsBroughtToTheEnemyBase, name: 'Flag is brought to the enemy base'},
    {type: GameEventType.FlagIsReturnedToTheBase, name: 'Flag is returned to the base'},
    {type: GameEventType.FlagIsReturnedToTheBaseByTimeout, name: 'Flag is returned to the base by timeout'},
    {type: GameEventType.FlagPickedUp, name: 'Flag has been picked up'},
    {type: GameEventType.LostTheFlag, name: 'Lost the flag'},
  ];
  gameEventForm: FormGroup;

  constructor(private fb: FormBuilder, gameService: GameService, private gameEventService: GameEventService) {
    gameService.selectedGame$.pipe(
        skipWhile(g => g === null),
        tap(g => {
          this.game = g;
          this.gameEventForm = this.fb.group({
            gameId: [this.game.id],
            playerId: [''],
            teamId: [''],
            gameEventType: [''],
            notes: [''],
          });
          this.selectedTeamPlayers$ = this.gameEventForm.controls['teamId']
            .valueChanges.pipe(map(teamId => this.game.teams.find(x => x.id === teamId).players));
        }),
        takeUntil(this.unsubscribed$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribed$.next();
  }

  updateProfile() {
    this.gameEventForm.patchValue({
      firstName: 'Nancy',
    });
  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.gameEventForm.value);
    this.gameEventService.post(this.gameEventForm.value).subscribe();
  }

}

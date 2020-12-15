import { GameEventService } from './../services/game-event.service';
import { GameService } from './../services/game.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game, GameEvent, GameEventType, Player } from '../models';
import { skipUntil, skipWhile, take, takeUntil, tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Subject, Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-event-form',
  templateUrl: './game-event-form.component.html',
  styleUrls: ['./game-event-form.component.css']
})
export class GameEventFormComponent implements OnDestroy {
  private unsubscribed$ = new Subject();
  gameEventId: number;
  game: Game;
  selectedTeamPlayers: Player[];
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

  constructor(private fb: FormBuilder,
    gameService: GameService,
    private gameEventService: GameEventService,
    private route: ActivatedRoute) {

    this.route.paramMap.pipe(
      map(params => +params.get('id')),
      switchMap(eventId => {
        if (eventId !== null && eventId !== 0) {
          return this.gameEventService.get(eventId);
        } else {
          return of<GameEvent>(null);
        }
      }),
      withLatestFrom(gameService.selectedGame$),
      tap(([event, game]) => {
        this.game = game; // TODO: populate separate options
        if (event !== null) {
          this.selectedTeamPlayers = game.teams.find(x => x.id === event.teamId).players;
          this.gameEventForm = this.fb.group({
            id: [event.id],
            gameId: [game.id],
            teamId: [event.teamId],
            playerId: [event.playerId],
            eventType: [event.eventType],
            notes: [event.notes],
          });
        } else {
          this.gameEventForm = this.fb.group({
            id: [0],
            gameId: [game.id],
            teamId: [null],
            playerId: [null],
            eventType: [null],
            notes: [null],
          });
        }
        this.gameEventForm.controls['teamId']
          .valueChanges.pipe(
            tap(teamId => this.selectedTeamPlayers = game.teams.find(x => x.id === teamId).players),
            takeUntil(this.unsubscribed$)
        ).subscribe();
      }),
      takeUntil(this.unsubscribed$)
    ).subscribe();

    // gameService.selectedGame$.pipe(
    //     skipWhile(g => g === null),
    //     tap(g => {
    //       this.game = g;
    //       this.gameEventForm = this.fb.group({
    //         gameId: [this.game.id],
    //         playerId: [''],
    //         teamId: [''],
    //         eventType: [''],
    //         notes: [''],
    //       });
    //       this.selectedTeamPlayers$ = this.gameEventForm.controls['teamId']
    //         .valueChanges.pipe(map(teamId => this.game.teams.find(x => x.id === teamId).players));
    //     }),
    //     takeUntil(this.unsubscribed$)
    //   ).subscribe();
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
    if (this.gameEventForm.value.id > 0) {
      this.gameEventService.put(this.gameEventForm.value).subscribe();
    } else {
      this.gameEventService.post(this.gameEventForm.value).subscribe();
    }
  }

}

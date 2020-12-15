export interface GameEvent {
  id: number;
  gameId: number;
  playerId?: number;
  teamId?: number;
  gameEventType: GameEventType;
  notes: string;
}

export enum GameEventType {
  CapturedTheFlag = 0,
  FlagPickedUp,
  LostTheFlag,
  FlagInterceptedByAnotherTeam,
  FlagIsReturnedToTheBase,
  FlagIsReturnedToTheBaseByTimeout,
  FlagIsBroughtToTheEnemyBase
}

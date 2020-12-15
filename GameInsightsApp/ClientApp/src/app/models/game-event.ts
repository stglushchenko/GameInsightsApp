export interface GameEvent {
  id: number;
  gameId: number;
  playerId?: number;
  teamId?: number;
  eventType: GameEventType;
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

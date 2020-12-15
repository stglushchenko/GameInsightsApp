import { Team } from './team';

export interface Game {
  id: number;
  name: string;
  spectatorEmployeeName: string;
  teams: Team[];
}

import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameEvent } from '../models';

export class GameEventService {
    readonly url = 'api/gameevents';

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    }

    public getAll(gameId: number): Observable<GameEvent[]> {
        return this.http.get<GameEvent[]>(this.baseUrl + this.url + '/?gameId=' + gameId);
    }

    public get(id: number) {
        return this.http.get<GameEvent>(this.urlById(id));
    }

    public put(gameEvent: GameEvent) {
        return this.http.put(this.urlById(gameEvent.id), gameEvent);
    }

    public post(gameEvent: GameEvent) {
        return this.http.post(this.baseUrl + this.url, gameEvent);
    }

    public delete(id: number) {
        return this.http.delete(this.urlById(id));
    }

    private urlById(id: number) {
        return this.baseUrl + this.url + '/' + id;
    }
}
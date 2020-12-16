import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameEvent } from '../models';

export class GameEventService {
    readonly url = 'api/gameevents';
    private eventListChangedSource = new Subject<void>();
    eventListChanged$ = this.eventListChangedSource.asObservable();

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    }

    public getAll(gameId: number): Observable<GameEvent[]> {
        return this.http.get<GameEvent[]>(this.baseUrl + this.url + '/?gameId=' + gameId);
    }

    public get(id: number) {
        return this.http.get<GameEvent>(this.urlById(id));
    }

    public put(gameEvent: GameEvent) {
        return this.http.put(this.urlById(gameEvent.id), gameEvent).pipe(tap(_ => this.eventListChangedSource.next()));;
    }

    public post(gameEvent: GameEvent) {
        return this.http.post(this.baseUrl + this.url, gameEvent).pipe(tap(_ => this.eventListChangedSource.next()));
    }

    public delete(id: number) {
        return this.http.delete(this.urlById(id)).pipe(tap(_ => this.eventListChangedSource.next()));;
    }

    private urlById(id: number) {
        return this.baseUrl + this.url + '/' + id;
    }
}
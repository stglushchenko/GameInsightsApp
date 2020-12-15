import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Game } from '../models';


export class GameService {
    readonly url = 'api/games';
    private lastSelectedGameSource = new BehaviorSubject<Game>(null);
    selectedGame$ = this.lastSelectedGameSource.asObservable();

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    }

    public getAll(): Observable<Game[]> {
        return this.http.get<Game[]>(this.baseUrl + this.url);
    }

    public get(id: number) {
        return this.http.get<Game>(this.baseUrl + this.url + '/' + id).pipe(
            tap(g => this.lastSelectedGameSource.next(g))
        );
    }
}

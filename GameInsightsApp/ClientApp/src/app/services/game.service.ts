import { Game } from './../models/game';
import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Observable } from 'rxjs';


export class GameService{
    readonly url = 'api/games';

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
        
    }

    public getAll(): Observable<Game[]> {
        return this.http.get<Game[]>(this.baseUrl + this.url);
    }

    public get(id: number){
        return this.http.get<Game>(this.baseUrl + this.url + '/' + id)
    }
}

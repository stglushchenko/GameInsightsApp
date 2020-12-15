import * as fromServices from './services';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { GamesComponent } from './games/games.component';
import { GameEventsComponent } from './game-events/game-events.component';
import { GameEventFormComponent } from './game-event-form/game-event-form.component';

const services = [
  fromServices.GameService,
  fromServices.GameEventService
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    GamesComponent,
    GameEventsComponent,
    GameEventFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'games', component: GamesComponent },
      { path: 'games/:id', component: GameEventsComponent,
        children: [
          { path: 'event/new', component: GameEventFormComponent,},
          { path: 'event/:id', component: GameEventFormComponent,},
        ],
      },
    ])
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule { }

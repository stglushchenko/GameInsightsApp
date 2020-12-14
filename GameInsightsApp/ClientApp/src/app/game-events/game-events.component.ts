import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game-events.component.html',
  styleUrls: ['./game-events.component.css']
})
export class GameEventsComponent implements OnInit {
  game;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.game = +params.get('id');//= games[+params.get('id')];
    });
  }

}

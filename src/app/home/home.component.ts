import { Component, OnInit, Optional } from '@angular/core';
import{ DataService} from '../data.service';
//import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1, transform: 'translateY(0)'
      })),
      state('hide',   style({
       opacity: 0, transform: 'translateY(40%) '
      })),
      transition('show => hide', animate('100ms ease-out')),
      transition('hide => show', animate('400ms ease-in'))
    ])
  ]

})
export class HomeComponent implements OnInit {

 show = false;
 nombre: number ;
 btntext: string = 'ajouter une etiquette';
 goalText: string = 'my first life goals';
 goals = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    
    this._data.goal.subscribe(res => this.goals=res);
    this.nombre = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  additem() {

    this.goals.push(this.goalText);
//  this.goalText = '';
    this.nombre = this.goals.length;
    this._data.changeGoal(this.goals);
            }
remove(i) {
  this.goals.splice(1,1);
  this.nombre--;
  this._data.changeGoal(this.goals);
}

  get stateName() {
    return this.show ? 'show' : 'hide';
                   }


  toggle() {
    this.show = !this.show;
  }

}

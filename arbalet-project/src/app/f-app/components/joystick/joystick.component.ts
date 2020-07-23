import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-joystick',
  templateUrl: './joystick.component.html',
  styleUrls: ['./joystick.component.scss'],
})
export class JoystickComponent implements OnInit {

  @Output() up = new EventEmitter();
  @Output() down = new EventEmitter();
  @Output() right = new EventEmitter();
  @Output() left = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}

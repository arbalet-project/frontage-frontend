import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { initialize } from 'initialization.js';
declare var initialize
declare var quitTetris

/**
 * Generated class for the OfflineTetrisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-offline-tetris',
  templateUrl: 'offline-tetris.html',
})
export class OfflineTetrisPage {
  messages: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.messages = {
      play: "Play!",
      howto_play_title: "HOW TO PLAY?",
      howto_play_goal: "The goal of Tetris Blocks is to stop blocks from leaving the inside of the outer gray hexagon.",
      howto_play_tap_keyboard: "Press the right and left arrow keys to rotate the hexagon",
      howto_play_tap_screen: 'Tap the left and right sides of the screen to rotate the hexagon',
      howto_play_instructions_1: "Clear blocks and get points by making 3 or more blocks of the same color touch.",
      howto_play_instructions_2: "Time left before your combo streak disappears is indicated by colored lines on the outer hexagon",
      paused_press_enter: "Press ENTER to start",
      paused: "Game Paused",
      short_howto_play_1_keyboard: 'Use the right and left arrow keys',
      short_howto_play_2_keyboard: 'to rotate the hexagon',
      short_howto_play_1: "Tap the screen's left and right",
      short_howto_play_2: 'sides to rotate the hexagon',
      short_howto_play_3: 'Match 3+ blocks to score',

    };
  }

  ionViewDidLoad() {
    initialize(0, this.messages);
  }

  ionViewDidLeave() {
    quitTetris();
  }

}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { cpuUsage } from 'process';

declare var initialize;
declare var quitTetris;
declare var getState;
declare var pause;

@Component({
  selector: 'app-offline-tetris',
  templateUrl: './offline-tetris.component.html',
  styleUrls: ['./offline-tetris.component.scss'],
})
export class OfflineTetrisComponent implements OnInit {
  messages: { [key: string]: string } = {};

  constructor(public translate: TranslateService) { }

  ngOnInit() {
    const messageKey = ['play', 'howto_play_title', 'howto_play_goal', 'howto_play_tap_keyboard', 'howto_play_tap_screen',
      'howto_play_instructions_1', 'howto_play_instructions_2', 'paused_press_enter', 'paused', 'short_howto_play_1_keyboard',
      'short_howto_play_2_keyboard', 'short_howto_play_1', 'short_howto_play_2', 'short_howto_play_3'];

    for (const message of messageKey) {
      this.messages[message] = this.translate.instant('tetris_block.' + message);
    }
    initialize(0, this.messages);
  }

  ionViewDidLeave() {
    quitTetris();
  }

}

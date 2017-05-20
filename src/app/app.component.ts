import { Component } from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'zkn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidenavConfig: any = {
    opened: false,
    mode: 'side'
  };

  constructor(media: ObservableMedia) {
    media.subscribe((change: MediaChange) => {
      this.sidenavConfig.mode = change.mqAlias === 'xs' ? 'over' : 'side';
    });
  }
}

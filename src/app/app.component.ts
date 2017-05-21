import { Component } from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import 'rxjs/add/operator/first';

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
    media.asObservable().first().subscribe((change: MediaChange) => {
      this.sidenavConfig.opened = !this.isSmallScreen(change);
    });

    media.subscribe((change: MediaChange) => {
      this.sidenavConfig.mode = this.isSmallScreen(change) ? 'over' : 'side';
    });
  }

  private isSmallScreen(change: MediaChange) {
    return ['xs', 'sm'].some((item) => item === change.mqAlias);
  }
}

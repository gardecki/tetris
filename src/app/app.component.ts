import { Component, HostListener } from '@angular/core';
import { BoardService } from './services/board.service';
import { ControlsService } from './services/controls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event) {
    this.cs.onKeyPress($event);
  }

  constructor(private cs: ControlsService, private bs: BoardService) {
  }


}

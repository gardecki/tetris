import { Component } from '@angular/core';
import { BoardService } from './services/board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private bs: BoardService) {
  }


}

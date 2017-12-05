import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TetrominoComponent } from './components/tetromino/tetromino.component';
import { CellComponent } from './components/cell/cell.component';
import { BoardComponent } from './components/board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardService } from './services/board.service';
import { BoardContainerComponent } from './containers/board-container/board-container.component';
import { TetrominoService } from './services/tetromino.service';
import { TetrominoBagService } from './services/tetromino-bag.service';

@NgModule({
  declarations: [
    AppComponent,
    TetrominoComponent,
    CellComponent,
    BoardComponent,
    BoardContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [
    BoardService,
    TetrominoService,
    TetrominoBagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

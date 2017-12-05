import {
  ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { Cell } from '../../interfaces/cell';
import { animate, group, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { IGrid } from '../../interfaces/grid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fullLine', [
      transition('* => 1', [
        group([
          query('app-cell[full="true"]', [
            style({boxShadow: 'none'}),
            animate(80, style({background: 'rgba(0,0,0,0)'})),
            animate(80, style({background: '#000000'})),
            animate(80, style({background: 'rgba(0,0,0,0)'})),
            animate(50, style({background: '#000000'})),
            group([
              animate('300ms ease-in', style({transform: 'scale(10)'})),
              animate('180ms ease', style({opacity: 0, borderRadius: '100%'})),
              animate(80, style({background: '#911c1c'})),
            ])
          ]),
          query('app-cell[above-full="1"]', [
            style({zIndex: 50}),
            animate('120ms 400ms ease-out', style({transform: 'translateY(32px)'}))
          ], {optional: true}),
          query('app-cell[above-full="2"]', [
            style({zIndex: 50}),
            animate('120ms 400ms ease-out', style({transform: 'translateY(64px)'}))
          ], {optional: true}),
          query('app-cell[above-full="3"]', [
            style({zIndex: 50}),
            animate('120ms 400ms ease-out', style({transform: 'translateY(96px)'}))
          ], {optional: true}),
          query('app-cell[above-full="4"]', [
            style({zIndex: 50}),
            animate('120ms 400ms ease-out', style({transform: 'translateY(128px)'}))
          ], {optional: true})
        ])
      ])
    ])
  ]
})
export class BoardComponent implements OnChanges {

  @Input() cells: IGrid;
  private fullLines = {};
  private aboveFullLines = {};

  @Output() clearLines: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('@fullLine')
  get fullLine() {
    return Object.getOwnPropertyNames(this.fullLines).length > 0;
  }

  @HostListener('@fullLine.done', ['$event'])
  onLineAnimationDone($event) {
    if ($event.toState) {
      this.clearLines.emit(this.fullLines);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('board changed', changes);
    this.setFullLines(changes.cells.currentValue);
    this.setLinesAboveFull();
  }

  setFullLines(cells: IGrid) {
    this.fullLines = cells.reduce((result, row, rowIndex) => {
      if (!row.includes(null)) {
        result[rowIndex] = true;
      }
      return result;
    }, {});
  }

  setLinesAboveFull() {
    const fl = Object.getOwnPropertyNames(this.fullLines);
    const result = {};
    if (fl.length) {
      for (let row = 0; row < this.cells.length; row++) {
        if (!this.fullLines[row]) {
          const fullLinesUnder = fl.reduce((p, c) => row < +c ? p + 1 : p, 0);
          if (fullLinesUnder) {
            result[row] = fullLinesUnder;
          }
        }
      }
    }
    this.aboveFullLines = result;
  }

  trackByIndexFn(index: number, row: number) {
    return index;
  }

}

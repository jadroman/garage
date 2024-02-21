import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { Observable, of, fromEvent, interval } from 'rxjs';
import { delay, first, map, takeLast } from 'rxjs/operators'

@Component({
  selector: 'app-car-history',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './car-history.component.html',
  styleUrl: './car-history.component.scss'
})
export class CarHistoryComponent {
  constructor() {
  }
}

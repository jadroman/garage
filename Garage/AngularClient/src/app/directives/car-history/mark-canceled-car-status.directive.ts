import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMarkCanceledCarStatusDirective]',
  standalone: true
})
export class MarkCanceledCarStatusDirective implements OnInit, OnChanges {
  @Input() isCanceled!: boolean;

  constructor(private el: ElementRef) {
    this.lineThroughIt()
  }

  ngOnChanges(): void {
    this.lineThroughIt()
  }

  ngOnInit(): void {
    this.lineThroughIt()
  }

  private lineThroughIt() {
    if (this.isCanceled) {
      this.el.nativeElement.style.textDecoration = 'line-through';
    }
  }
}

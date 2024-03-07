import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appMarkCanceledCarStatusDirective]',
  standalone: true
})
export class MarkCanceledCarStatusDirective implements OnInit {
  @Input() isCanceled!: boolean;

  constructor(private el: ElementRef) {
    if (this.isCanceled) {
      this.el.nativeElement.style.textDecoration = 'line-through';
    }
  }

  ngOnInit(): void {
    if (this.isCanceled) {
      this.el.nativeElement.style.textDecoration = 'line-through';
    }
  }
}

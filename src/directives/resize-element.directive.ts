import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizeElement]',
  standalone: true
})
export class ResizeElementDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.resizeElement('200px', '20px'); 
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resizeElement('100px', '20px');
  }

  private resizeElement(width: string, height: string) {
    this.renderer.setStyle(this.el.nativeElement, 'width', width); 
    this.renderer.setStyle(this.el.nativeElement, 'height', height); 
  }

}

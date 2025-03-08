
import { Component } from '@angular/core';
import { DateTimePipe } from '../pipes/date-time.pipe'
import { DatePipe } from '@angular/common';
import { ResizeElementDirective } from '../../directives/resize-element.directive';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DateTimePipe, ResizeElementDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]
})
export class HomeComponent {
  today: Date = new Date();
}

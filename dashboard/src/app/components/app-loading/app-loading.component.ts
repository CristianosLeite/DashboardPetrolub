import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-app-loading',
  standalone: true,
  imports: [],
  templateUrl: './app-loading.component.html',
  styleUrl: './app-loading.component.scss'
})
export class AppLoadingComponent {
  @Output() loading: boolean = false;
}

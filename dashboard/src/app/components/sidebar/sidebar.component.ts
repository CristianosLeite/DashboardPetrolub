import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class SidebarComponent {
  @Input()
  isExpanded: boolean = false;

  constructor() { }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }
}

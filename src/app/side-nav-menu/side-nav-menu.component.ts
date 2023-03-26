import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent {
  @Output()
  sideNavClick = new EventEmitter();

  navClicked() {
    this.sideNavClick.emit();
  }
}



import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Output()
  showSideNav = new EventEmitter();

  onMenuClick(){
    this.showSideNav.emit();
  }
 
}

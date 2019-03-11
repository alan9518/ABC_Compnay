import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent implements OnInit {

  @Input() buttonText : String;
  @Input() buttonLink : String;

  constructor() { }

  ngOnInit() {
  }

}

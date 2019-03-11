import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-button',
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.css']
})
export class AppButtonComponent implements OnInit {
  
  @Input() buttonText : String
  @Input() disabled : boolean;


  constructor() {
    
  }

  ngOnInit() {
  }

}

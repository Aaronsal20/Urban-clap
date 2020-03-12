import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isOpen = false;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
   this.headerService.change.subscribe(isOpen => {
    this.isOpen = isOpen;
   });
  }

  drawerOpener() {
    console.log("click");
    return false;
  }

  //  public toggle() {
  //   this.drawer = !this.drawer;
  // }

}

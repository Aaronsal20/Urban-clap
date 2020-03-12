import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authListenerSubs: Subscription;
  isUserAuthenticated = false;

  constructor(private headerService: HeaderService, public authService: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  openDrawer() {
  this.headerService.toggle();
  }

}

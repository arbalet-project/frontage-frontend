import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {
  constructor(public router: Router, public auth: AuthenticationService) {}
  public logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}

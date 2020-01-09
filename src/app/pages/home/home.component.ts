import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public myAccount : any;
  ax : any;

  constructor( private auth: AuthService,
               private router: Router) {}

  ngOnInit() {
    this.ax = this.auth.getAccount();
    this.myAccount = JSON.parse(this.ax);
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }


}

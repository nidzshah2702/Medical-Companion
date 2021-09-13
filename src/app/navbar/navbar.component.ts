import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userservice:UserService) { }

  ngOnInit() {
  }

  logout(){
      this.userservice.logout();
      window.alert("you are loggedout")
      document.getElementById('login').style.display="block";
      document.getElementById('logout').style.display="none";
  }
}

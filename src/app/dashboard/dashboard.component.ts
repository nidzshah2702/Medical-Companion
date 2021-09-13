import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any
  username:any
userid:any
  constructor(private userservice:UserService,private router:Router) { }

  ngOnInit() {


if(this.userservice.loggedIn()!=undefined){
this.user=this.userservice.getDetails();
  this.username=this.user['name'];
this.userid=this.user['_id'];
document.getElementById('login').style.display="none";
document.getElementById('logout').style.display="block";
document.getElementById('dashboard').style.display="block";


}else{
  
  window.alert("you are not logged in")

  this.router.navigate(['/login']);
}

  }

  goto(address:string){
    if(address=="myreports"){
      this.router.navigate(['/myreports',this.userid])
    }else if(address=="mymedication"){
      this.router.navigate(['/mymedication',this.userid])
    }else{
      this.router.navigate(['/viewprofile',this.userid])
    }
    
  }
}

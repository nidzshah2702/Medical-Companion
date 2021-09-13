import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    
    $(document).ready(function(){
      
      $(".panel").fadeIn("slow");
  });

  }

  registerUser(user){
    this.userService.registerUser(user);
    window.alert("Registration Successful");
    this.router.navigate(['/login']);
    
  }
}

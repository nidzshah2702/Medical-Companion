import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userserivce:UserService) { }

  ngOnInit() {
    $(document).ready(function(){
      
      $(".login-form").fadeIn("slow");
  })
  }

  loginUser(user){
     this.userserivce.loginUser(user)
      
      }
  }



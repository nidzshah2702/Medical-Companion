import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../service/user.service'

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  userdetails:any
  user_id:any
  constructor(private route:ActivatedRoute,private userservice:UserService,private router:Router,private profileservice:ProfileService) { }

  ngOnInit() {
    if(this.userdetails=this.userservice.loggedIn() !=undefined){
      this.route.params.subscribe(params=>{this.user_id=params['id']})
      console.log(this.user_id)
      this.userdetails=this.userservice.getDetails();
      console.log(this.userdetails);
    
      
    }else{
      window.alert("you are not logged in")
  this.router.navigate(['/login']);
    }
  }
saveProfile(data1){
  console.log(data1)
var data={user:this.userdetails,data:data1}
console.log(data)
  this.profileservice.saveprofile(data);

}

}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../service/user.service'


@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {

  userdetails:any
  user_id:any
  profile:any
  constructor(private route:ActivatedRoute,private userservice:UserService,private router:Router,private profileservice:ProfileService) { }

  ngOnInit() {
    if(this.userdetails=this.userservice.loggedIn() !=undefined){
      this.route.params.subscribe(params=>{this.user_id=params['id']})
      console.log(this.user_id)
      this.userdetails=this.userservice.getDetails();
      console.log(this.userdetails);
      this.getprofile().subscribe((result)=>{
        if(result[0]==undefined){
          window.alert("you have not created your profile");
          this.router.navigate(['/createprofile',this.user_id]);
          return
        }
        console.log(result[0])
        this.profile=result[0]
      })
    
      
    }else{
      window.alert("you are not logged in")
  this.router.navigate(['/login']);
    }

  }

  goto(){
    this.router.navigate(['/updateprofile',this.user_id]);
  }
  getprofile(){
    return this.profileservice.getprofile(this.user_id)
  
  }
}

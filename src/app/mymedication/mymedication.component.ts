import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../service/user.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mymedication',
  templateUrl: './mymedication.component.html',
  styleUrls: ['./mymedication.component.css']
})
export class MymedicationComponent implements OnInit {
  userdetails:any
  userid:any
  mymedications:any=[]
  constructor(private route:ActivatedRoute,private userservice:UserService,private router:Router,private http:HttpClient) { }

  ngOnInit() {
    if(this.userdetails=this.userservice.loggedIn() !=undefined){
      this.route.params.subscribe(params=>{this.userid=params['id']})
      console.log(this.userid)
      this.getmedication();
      
    }else{
      window.alert("you are not logged in")
  this.router.navigate(['/login']);
    }
 
  }
  getmedication(){
    this.http.get("http://localhost:3000/getmedication/"+this.userid).subscribe((result)=>{
      console.log(result);
      this.mymedications=result;
    })
  }
  goto(){
    this.router.navigate(['/addmedication'])
  }

}

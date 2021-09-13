import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { withModule } from '@angular/core/testing';

@Component({
  selector: 'app-addmedication',
  templateUrl: './addmedication.component.html',
  styleUrls: ['./addmedication.component.css']
})
export class AddmedicationComponent implements OnInit {

  constructor(private http:HttpClient,private userservice:UserService,private router:Router) { }
user:any
userid:any
username:any

  ngOnInit() {
    if(this.userservice.loggedIn()!=undefined){
      this.user=this.userservice.getDetails();
        this.username=this.user['name'];
      this.userid=this.user['_id'];
      document.getElementById('login').style.display="none";
      document.getElementById('logout').style.display="block";
      
      }else{
        
        window.alert("you are not logged in")
      
        this.router.navigate(['/login']);
      }
  }


  addmedication(form){
    var body={user:this.user,form:form}
    console.log(body);
    this.http.post("http://localhost:3000/addmedication",body).subscribe((res)=>{
      if(res['message']!=null){
        console.log("medicine added");
        window.alert("medicine added");
        this.router.navigate(['/mymedication',this.userid])
      }
    })
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../../backend/models/User'
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) {

   }
   userid:any
     userdetails:any
   registerUser(user){
     this.http.post('http://localhost:3000/register',user).subscribe((res)=>{
       console.log(res);
     });
   }
   loginUser(user):any{
     console.log("in login")
   this.http.post('http://localhost:3000/login',user).subscribe((result)=>{console.log(result)
   if(result['message']!=undefined){
    window.alert(result['message']);
    }else{
      this.userdetails=result;
      localStorage.setItem('loggeduser',this.userdetails);
      this.userid=this.userdetails['_id']
      console.log(this.userid)
      this.router.navigate(['/dashboard'])
    }
   
    
      //var a=JSON.stringify(result);
      //if(a=="user not found"){
       //console.log(a);
      //}
 });
 
    }
    logout(){
    
      localStorage.removeItem('loggeduser')
      this.router.navigate(['/login'])
    }
    loggedIn(){
      return localStorage.getItem('loggeduser');
    }
    getDetails(){
      return this.userdetails;
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {

  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router) { }
email:any
  ngOnInit() {
    this.route.params.subscribe(params=>{this.email=params['id']})
    console.log(this.email)
  }
  setPass(form){
    if(!form.password) {
  
      window.alert( "Password is required.");
      }
      if (!form.confirmPassword) {

      window.alert( "Confirmation password is required.");
      }
      if (form.password && form.confirmPassword) {
           if (form.password.length < 5) {
      
              window.alert("Password minimum lenght is 5.");
      } else if (form.password !== form.confirmPassword) {
  
      window.alert( "The password confirmation does not match.");
           }
    else{
  
var body={email:this.email,password:form.password}
console.log(body)
      this.http.post("http://localhost:3000/newpassword",body).subscribe((res)=>{
        console.log(res);
        window.alert("password is set")
        this.router.navigate(['/login'])
      })
}
  }
}

}  
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }
email:any
  ngOnInit() {
    this.route.params.subscribe(params=>{this.email=params['id']})
      console.log(this.email)
  }

  checkToken(form){
var body={email:this.email,form:form}
console.log(body)
    this.http.post("http://localhost:3000/checktoken",body).subscribe((res)=>{
      if(res['message']=="invalid token"){
        window.alert("invalid token");
      }else{
        console.log(res)
        this.router.navigate(['/newpassword',res['email']])
      }
    })
  }
}

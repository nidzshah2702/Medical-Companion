import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }

  checkUser(body){
    this.http.post("http://localhost:3000/check",body).subscribe((res)=>{
      console.log(res)
      this.router.navigate(['/resetpassword',res['email']])
    }
    )
  }
}

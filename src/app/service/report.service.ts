import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../../backend/models/User'
import {Router} from '@angular/router';
import {Report} from '../../../backend/models/Reports';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient,private router:Router) { }

  addreport(data){
   // var user=JSON.parse(data.user);
    //console.log(user);
    console.log(data.user);
    return this.http.post('http://localhost:3000/addreport',data)

    
     //this.router.routeReuseStrategy.shouldReuseRoute = function () {
     //  return false;
     //};



  }

  getreport(id){
    console.log(id)
     return this.http.get('http://localhost:3000/getreport/'+id)
  }
  downloadFile(file:string){
    var body = {filename:file};

    return this.http.post('http://localhost:3000/download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}

delete(body){
//  var body = {filename:file};
  console.log(body)

 return this.http.post('http://localhost:3000/delete',body)
  

  }

  
deleteReport(body){
  console.log(body)
  return this.http.post('http://localhost:3000/deletereport',body)

}
}

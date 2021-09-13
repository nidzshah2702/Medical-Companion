import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient,private router:Router) { }

saveprofile(data){
  this.http.post('http://localhost:3000/saveprofile',data).subscribe((res)=>{
    console.log(res)
    this.router.navigate(['/viewprofile',data.user._id])
})

}

getprofile(id){
  return this.http.get('http://localhost:3000/getprofile/'+id);
}
updateprofile(data){
  this.http.post('http://localhost:3000/updateprofile',data).subscribe((res)=>{
    console.log(res)
    window.alert('profile updated');
    this.router.navigate(['/viewprofile',data.user._id])
})
}
}

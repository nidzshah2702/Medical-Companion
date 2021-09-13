import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../service/user.service'
import { NgForOfContext } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ReportService } from '../service/report.service';
import {User} from '../../../backend/models/User'
import {saveAs} from 'file-saver'


@Component({
  selector: 'app-myreports',
  templateUrl: './myreports.component.html',
  styleUrls: ['./myreports.component.css']
})
export class MyreportsComponent implements OnInit {
  filesToUpload: Array<File>;
  filename:String;
  reportname:String
  userdetails:any
  user_id:any
  reports:any=[]
  constructor(private route:ActivatedRoute,private userservice:UserService,private router:Router,private reportservice:ReportService) { 
    this.filesToUpload = [];
    
   
  }

  ngOnInit() {
    $(".custom-file-input").on("change", function() {
      var fileName = $(this).val().split("\\").pop();
      $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
    });
    if(this.userdetails=this.userservice.loggedIn() !=undefined){
      this.route.params.subscribe(params=>{this.user_id=params['id']})
      console.log(this.user_id)
      this.userdetails=this.userservice.getDetails();
      console.log(this.userdetails);
      this.getreport().subscribe((result)=>{
        console.log(result)
        this.reports=result;
      })
      
    }else{
      window.alert("you are not logged in")
  this.router.navigate(['/login']);
    }
    $(document).ready(function(){
      $("button").click(function(){
        $("#reportform").toggle();
      });
    });
  }
  upload() {
    this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then((result) => {
        console.log(result[0]);
        this.reportname=result[0].originalname;
        this.filename=result[0].filename;
        console.log(this.reportname);
        console.log(this.filename);
        var data={user:this.userdetails,reportname:this.reportname,filename:this.filename};
        this.reportservice.addreport(data).subscribe(()=>{
          this.getreport().subscribe((result)=>this.reports=result)
        });
        

    }, (error) => {
        console.error(error);
    });
    console.log(this.filename);
}

fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
}

makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads", files[i], files[i].name);
        
        }
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}
getreport(){
  return this.reportservice.getreport(this.user_id)

}
download(index){
  console.log(index)
  var filename = this.reports[index].filename+this.reports[index].reportname;
  console.log(filename);
  this.reportservice.downloadFile(filename)
  .subscribe(
      data => saveAs(data, filename),
      error => console.error(error)
  );
}

delete(index){
  var fname = this.reports[index].filename+this.reports[index].reportname;
  console.log(fname);
  var body={file:this.reports[index],filename:fname}
  this.reportservice.delete(body);
   this.deleteReport(body).subscribe();
    

}
deleteReport(body){
  return this.reportservice.deleteReport(body)
}
refresh(){
  this.getreport().subscribe((result)=>{
  console.log("refreshing...")
  this.reports=result})

}
}

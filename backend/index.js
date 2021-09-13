var express = require('express');
var mongoose= require('mongoose');
var cors= require('cors');
var bodyparser=require('body-parser');
var app= express();
var bcrypt=require('bcrypt');
var User=require('./models/User');
var Report=require('./models/Reports')
var multer=require('multer');
var path = require('path');
var fs=require('fs');
var Profile=require('./models/Profile')
var ResetPassword=require('./models/ResetPassword')
var nodemailer=require('nodemailer');
var Medication=require('./models/Medication');

var transporter=nodemailer.createTransport({service:"gmail",auth:{user:'useremail',pass:'password'}})

var db=mongoose.connect('mongodb://127.0.0.1/atdatabase',function(err,response){ 
    if(err) console.log(err); else{ console.log("connection successful");}
});
app.use(cors());
app.set('port',process.env.port || 3000);
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.get('/',(req,res)=>{
    res.send('hello');
});

app.post('/register',(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var mobileno=req.body.mobileno;
    var password=req.body.password;

    var usr=new User();
    usr.name=name;
    usr.email=email;
    usr.mobileno=mobileno;
    usr.password=password;

    usr.save((err,result)=>{
        if(err){
            console.log(err);
            res.send({success:'there is an error in updating',status:500});
    }
        
        else{
            console.log("user added");
            res.send({success:'successful',status:200});

        }
    })
});
app.post("/login",(req,res,callback)=>{

    name=req.body.name;
    password=req.body.password;
    

    User.findOne({ name:name })
    .exec(function (err, user) {
      if (err) {
        res.send({'message':"user not found"})
        return
      } else if (!user) {
       // var err = new Error('User not found.');
       // err.status = 401;
        res.send({'message': "user not found"})
        return
        //return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
            console.log(user);
          res.send(user);

          
        } else {
            res.send({'message':"incorrect password"})
         // return callback();
        }
      })
    });
});
app.post("/upload", multer({dest: "./uploads/"}).array("uploads",12), function(req, res) {
  
  fs.rename(path.join(__dirname,'../backend/uploads') +'/'+ req.files[0].filename,path.join(__dirname,'../backend/uploads') +'/'+req.files[0].filename+ req.files[0].originalname,(err)=>{
   if(err){
     console.log(err);
    }else{
     // req.files[0].filename=req.files[0].filename+req.files[0].originalname;
      console.log(req.files[0].filename);
     console.log("filename updated")
    }
  })
  res.send(req.files);
});
app.post('/addreport',(req,res)=>{

  var report=new Report();
  report.user=req.body.user;
  report.filename=req.body.filename;
  report.reportname=req.body.reportname;
  report.save((err,result)=>{
    if(err){
        console.log(err);
        res.send({success:'there is an error in adding report',status:500});
}
    
    else{
        console.log("report added");
        res.send({success:'successful',status:200});

    }
})

})

app.get('/getreport/:id',(req,res)=>{
  userid=req.params.id;
  console.log(userid);
  Report.find({"user._id":userid},(err,result)=>{
    if(err){
      console.log(err);
    }else{
        res.json(result)
        return
    }
  });
})

app.post('/saveprofile',(req,res)=>{
  var profile=new Profile();
  profile.user=req.body.user;
  profile.firstName=req.body.data.firstname;
  profile.lastName=req.body.data.lastname;
  profile.height=req.body.data.height;
  profile.weight=req.body.data.weight;
  profile.allergicinfo=req.body.data.allergicinfo;
  profile.emergencycont=req.body.data.emergencycont;
  profile.bloodgroup=req.body.data.bloodgroup;
  profile.other=req.body.data.other;
  profile.lastwishes=req.body.data.lastwishes;
  profile.chronicdiseases=req.body.data.chronicdiseases;
  
  profile.save((err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log("profile saved");
      res.send({success:"profile added",status:200})
    }
  })



})

app.post('/download', function(req,res,next){
  filepath = path.join(__dirname,'../backend/uploads') +'/'+ req.body.filename;
  res.sendFile(filepath);
});
app.get('/getprofile/:id',(req,res)=>{
  userid=req.params.id;
  console.log(userid);
  Profile.find({"user._id":userid},(err,result)=>{
    if(err){
      console.log(err);
    }else{
        res.json(result)
        return
    }
  });
})

app.post('/updateprofile',(req,res)=>{
  
 
  Profile.update({'user._id':req.body.user._id},{$set:{firstName:req.body.data.firstname,
    lastName:req.body.data.lastname,
    height:req.body.data.height,
    weight:req.body.data.weight,
    allergicinfo:req.body.data.allergicinfo,
    emergencycont:req.body.data.emergencycont,
    bloodgroup:req.body.data.bloodgroup,
    other:req.body.data.other,
    lastwishes:req.body.data.lastwishes,
    chronicdiseases:req.body.data.chronicdiseases}},
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log("profile updated");
      res.send({success:"profile updated",status:200})
    }
  })



})

app.post('/delete',(req,res)=>{
  filepath = path.join(__dirname,'../backend/uploads') +'/'+ req.body.filename;
  fs.unlink(filepath,(err)=>{
    if(err){
      console.log(err)
    }else{
      console.log("file deleted")
    }
  })
 
})
app.post('/deletereport',(req,res)=>{
  console.log(req.body)
  Report.remove({"_id":req.body.file._id},(err)=>{
     if(err){
        console.log(err)
    }else{
         console.log("file  deleted from mongo")
    }
})
})
app.post('/check',(req,res)=>{
  const email = req.body.email
   User.findOne(
            {email: email},function (err,user) {
           if (!user) {
               return throwFailed(res, 'No user found with that email address.')
           }
           ResetPassword
               .findOne( {"user._id": user._id},(err,resetPassword)=> {
               if(err){
                 console.log(err)
               }else{
                 console.log(resetPassword);
                 if(resetPassword!=null){
                  ResetPassword.remove({"_id": resetPassword._id},(err)=>{
                    if(err){
                      console.log(err)
                    }else{
                      console.log("entry removed");
                    }
                   })
                 }
                  
               token =  Math.floor(100000 + Math.random() * 900000)
               //creating the token to be sent to the forgot password form (react)
              var rp=new ResetPassword();
                rp.user=user;
                rp.resetPasswordToken=token
                   rp.save((err,result)=>{
                     if(err){
                       console.log(err)
                     }else{
                       console.log("rp added")
                     
                       let mailOptions = {
                        from:'sendermail',
                        to: user.email,
                        subject: 'Reset your account password for medical companion',
                        text:"Your code is"+token
                    }
                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                      } else {
                        console.log('Email sent: ' + info.response);
                        res.send(user)
                        return;
                      }
                    });
                     }

                  
           });}   
       })
      }) 
})
              

app.post('/checktoken',(req,res)=>{
  ResetPassword.findOne({"user.email":req.body.email,"resetPasswordToken":Number.parseInt(req.body.form.token)},(err,result)=>{
    if(err){
      console.log(err);
    }else{
      if(result==null){
        console.log("invalid token")
        res.send({message:"invalid token"})
      }else{
        console.log(result)
        res.send({email:result.user.email})
        return
      }
    }
  })
})
app.post('/newpassword',(req,res)=>{
  var password=req.body.password
  console.log(req.body)
  bcrypt.hash(password, 10, function (err, hash){
    if (err) {
      console.log(err);
    }
    password = hash;
    console.log(hash)
        User.update({"email":req.body.email},{$set:{"password":password}},(err,result)=>{
            if(err){
              console.log(err)
            }else{
              console.log(result)
              console.log("password set");
              res.send({success:"password set",stats:200})
            }
        })
  })
})

app.post('/addmedication',(req,res)=>{
  var medi=new Medication()
  console.log(req.body)
  medi.pillname=req.body.form.pillname;
  medi.time=req.body.form.time;
  medi.startDate=req.body.form.startDate;
  medi.endDate=req.body.form.endDate;
  medi.description=req.body.form.description;
  medi.user=req.body.user;
  medi.save((err,result)=>{
      if(err){
        console.log(err);
      }else{
        console.log(req.body.form)
        console.log("medicine added")
        res.send({message:"medicine added"})

      }
  })

})
app.get('/getmedication/:id',(req,res)=>{
  userid=req.params.id;
  console.log(userid);
  Medication.find({"user._id":userid},(err,result)=>{
    if(err){
      console.log(err);
    }else{
        res.json(result)
        return
    }
  });
})
app.use(express.urlencoded({ extended: true }));
app.listen(app.get('port'),function(){
    console.log("Server is running.....");
});

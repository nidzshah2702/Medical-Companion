var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
var rpSchema= mongoose.Schema({
    user:{type:Object,required:true},
    resetPasswordToken:{type:Number},
   
});

  
var ResetPassword=module.exports=mongoose.model('ResetPassword',rpSchema);
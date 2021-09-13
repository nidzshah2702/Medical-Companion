var mongoose=require('mongoose');
var bcrypt=require('bcrypt');
var userSchema= mongoose.Schema({
    name:{type: String , required:true},
    password:{type: String , required:true},   
     email:{type: String , required:true},
    mobileno:{type: String , required:true}
});
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });
  
var User=module.exports=mongoose.model('User',userSchema);
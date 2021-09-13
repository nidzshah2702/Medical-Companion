var mongoose= require('mongoose');
var profileSchema=mongoose.Schema({
    user:{type:Object},
    firstName:{type:String, required:true},
    lastName:{type:String},
    emergencycont:{type:String,requires:true},
    height:{type: Number},
    bloodgroup:{type:String},
    weight:{type:Number},
    allergicinfo:{type:String},
    chronicdiseases:{type:String},
    lastwishes:{type:String},
    other:{type:String}

})

var Profile=module.exports=mongoose.model('Profile',profileSchema)
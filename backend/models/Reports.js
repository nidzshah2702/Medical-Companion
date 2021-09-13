var mongoose= require('mongoose');
var reportSchema=mongoose.Schema({
    user:{type:Object},
    reportname:{type:String, required:true},
    filename:{type:String},
    description:{type:String}

})

var Report=module.exports=mongoose.model('Report',reportSchema)
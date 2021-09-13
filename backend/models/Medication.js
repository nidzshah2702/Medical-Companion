var mongoose=require('mongoose')

var medicationSchema=mongoose.Schema({
    user:{type:Object,required:true},
    pillname:{type:String,required:true },
    time:{type:String},
    startDate:{type:String},
    endDate:{type:String},
    description:{type:String}

    

});

var Medication=module.exports=mongoose.model('Medication',medicationSchema)
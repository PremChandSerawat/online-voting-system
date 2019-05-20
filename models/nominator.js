const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const NominatorSchema=new Schema({
  name:{
    type:String,
    required : true,
  },
  email:{
    type:String,
    unique : true,
    required : true,
    dropDups: true,
  },
  post:{
    type:String,
    required : true,
    default:"President"
  },
  password:{
    type:String,
    required : true,
  },
  registrationDate:{
    type:Date,
    default:Date.now
  },
  status:{
  type:String,
  default:"Deactive"  
  }
});

module.exports=Nominator=mongoose.model('nominator',NominatorSchema);

const mongoose =require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema =mongoose.Schema;
const VoterSchema=new Schema({
  name:{
    type:String,
    required:true,
  },
  enrNo:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    unique : true,
    required : true,
    dropDups: true,
  },
  gender:{
    type:String,
    required:true,
  },
  registrationDate:{
    type:Date,
    default:Date.now
  },
  status:{
    type:String,
    default:'Deactive'
  }
});

module.exports=Voter=mongoose.model('voter',VoterSchema);

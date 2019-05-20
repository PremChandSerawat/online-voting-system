const mongoose =require('mongoose');
const Schema =mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const VotingSchema=new Schema({
  voterEmail:{
    type:String,
    required:true,
  },
  canditateEmail:{
   type:String,
   required:true,
  },
  post:{
    type:String,
    required:true,
  },
});

module.exports=Voting=mongoose.model('voting',VotingSchema);

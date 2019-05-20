const mongoose =require('mongoose');
const Schema =mongoose.Schema;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const AdminSchema=new Schema({
  pageStatus:{
    type:String,
    required:true,
    default:"defaultPage"
  },
  password:{
   type:String,
   required:true,
  },
  nominationStatus:{
    type:String,
    required:true,
    default:'NominationNotStart'
  },
  voting:{
    type:String,
    default:"NotStartYet"
  },
  result:{

  }
});

module.exports=Admin=mongoose.model('admin',AdminSchema);

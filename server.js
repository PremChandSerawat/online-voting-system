const express =require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();
//body parser middleware
app.use(bodyParser.json());
//db config
const db=require('./config/keys').mongoUrl;

//contect mongodb
mongoose.connect(db,{useNewUrlParser:true}).then(()=>console.log("mongodb connnet.....")).catch(err=>console.log(err));

//init voter api in variable
const voterRegistration=require('./routes/api/voterRegistration');
//set the routes to voterRegistration
app.use('/rest',voterRegistration)


const port =process.env.PORT || 5000;

app.listen(port,()=>console.log(`server started on port ${port}`));

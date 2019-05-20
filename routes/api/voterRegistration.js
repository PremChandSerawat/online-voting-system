const express =require('express');
const router =express.Router();
//var mailOptions =require('../../services/sendOtp');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'serawatpremchand143@gmail.com',
    pass: 'panditji9571'
  }
});



const Voter=require('../../models/voter');
const Admin=require('../../models/Admin');
const Nominator=require('../../models/nominator');
const Voting=require('../../models/voting');
//get all voter list form mongodb atlas
router.get('/',(req,res)=>{
  console.log("rest api is called");
  console.log("req",req);
  Voter.find()
  .sort({
  Date:-1,
  })
  .then(items=>{
    res.json(items)
  })
});


router.post('/',(req,res)=>{
  console.log("req object",req.body);
  console.log("request are get",req.body.name);
  const newVoter=new Voter({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    enrNo:req.body.enrNo,
    gender:req.body.gender,
  });
newVoter.save().then(voter=>{
  console.log('voter registered');
  res.json({"massage":"voter register"})
}).catch(err=>{
  console.log("massage",err);
  res.json({
    'massage':'something went wrong'
  })
})

})
router.get('/voterList',(req,res)=>{
  console.log("rest api is called");
  console.log("req",req);
  Voter.find()
  .sort({
  Date:-1,
  })
  .then(voters=>{
    res.json(voters)
  })
})
//candidateList  for voting
router.post('/candidateList',(req,res)=>{
  console.log("rest api is called");
  Nominator.find({post:req.body.post,status:'Active'})
  .sort({
  Date:-1,
  })
  .then(candidate=>{
    console.log("candidate",candidate);
    res.json(candidate)
  })
})
//candidateList
router.get('/candidateList',(req,res)=>{
  console.log("rest api is called");
  console.log("req",req);
  Nominator.find()
  .sort({
  Date:-1,
  })
  .then(candidate=>{
    res.json(candidate)
  })
})

//verifyCandidate
router.post('/verifyCandidate',(req,res)=>{
  console.log("rest api is called");
  //console.log("req",req);
  Voter.find({email:req.body.email})
  .then(voters=>{
    console.log("voters",voters.length);
     if(voters[0].email==req.body.email)
     {    var name=voters[0].name;
       console.log("name is",name);
          var otp =Math.floor(Math.random() * 100000);
          var mailOptions ={
            from:'serawatpremchand143@gmail.com',
            to: req.body.email,
            subject: `Sending Email using Node.js ${otp}`,
            text: 'That was easy!'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
res.json({"otp":otp,"isValid":true,"name":name});
     }else
      res.json({"isValid":false});
  }).catch(err=>{
    console.log("err",err);
    res.json({'isValid':false})
  })
})


router.post('/voterStatus',(req,res)=>{
  console.log("voter status");
  var status;
  if(req.body.status=='Active')
    status="Deactive";
    else {
      status="Active"
    }
  console.log("email",req.body.email);
  console.log("status",req.body.status);
Voter.updateOne({email:req.body.email},{status:status}).then(console.log("database updated"));
})
//send mail for user verification
router.post('/sendOtp',(req,res)=>{
  console.log("email is ",req.body.email);
  var mailOptions ={
    from:'serawatpremchand143@gmail.com',
    to: req.body.email,
    subject: `Sending Email using Node.js ${req.body.otp}`,
    text: 'That was easy!'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})
//voting
router.post('/voting',(req,res)=>{
  console.log("rest api is called");
  //console.log("req",req);
  Voter.find({email:req.body.voterEmail,password:req.body.password})
  .then(voters=>{
    console.log("voters",voters.length);
     if(voters[0].email==req.body.voterEmail)
     {    var name=voters[0].name;
       console.log("name is",name);
          var otp =Math.floor(Math.random() * 100000);
          var mailOptions ={
            from:'serawatpremchand143@gmail.com',
            to: req.body.voterEmail,
            subject: `Sending Email using Node.js ${otp}`,
            text: 'That was easy!'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
res.json({"otp":otp});
     }else
      res.json({"isValid":false});
  }).catch(err=>{
    console.log("err",err);
    res.json({otp:0})
  })
})

//add vote to voting document
router.post('/addVote',(req,res)=>{
  const newVoter=new Voting({
    voterEmail:req.body.voterEmail,
    canditateEmail:req.body.canditateEmail,
    post:req.body.post
  });
newVoter.save().then(voter=>{
  console.log('voter registered');
  res.json({"massage":"voting succefuly"})
}).catch(err=>{
  console.log("massage",err);
  res.json({
    'massage':'something went wrong'
  })
})

})






//handle state of NominationNotStart
router.post('/nominationStatusChange',(req,res)=>{
  console.log("req nominationStatus received");
  var nominationStatus;
  if(req.body.nominationStatus=="Start")
  {
    console.log("if block");
    nominationStatus="Stop";
  }else if(req.body.nominationStatus=="Stop"){
    console.log("else block");
    nominationStatus="Not Start";
  }
  else{
    nominationStatus="Start";
  }

Admin.update({},{nominationStatus:nominationStatus}).then(
  console.log("log admin nomination updated"))
})
//handle status of Candidates

router.post('/candidateStatusChange',(req,res)=>{
  console.log("req nominationStatus received");
  var candidateStatus;
  if(req.body.status=="Deactive")
  {
    console.log("if block");
    candidateStatus="Active";
  }else{
    console.log("else block");
    candidateStatus="Deactive";
  }

Nominator.updateOne({email:req.body.email},{status:candidateStatus}).then(
  console.log("log admin nomination updated"))
})

//handle voting state
router.post('/votingStatusChange',(req,res)=>{
  console.log("req nominationStatus received");
  var voting;
  if(req.body.voting=="Start")
  {
    console.log("if block");
    voting="Stop";
  }else{
    console.log("else block");
    voting="Start";
  }
Admin.update({},{voting:voting}).then(
  console.log("log admin nomination updated"))
})

//give the state of adminPage
router.get('/nominationStatus',(req,res)=>{

Admin.find().then(admin=>{
  res.json(admin)
})
});
//candidateRegistration
router.post('/candidateRegistration',(req,res)=>{
  console.log("req object",req.body);

  const newNominator=new Nominator({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    post:req.body.post,
  });
newNominator.save().then(voter=>{
  console.log('voter registered');
  res.json({"massage":"voter register"})
}).catch(err=>{
  console.log("massage",err);
  res.json({
    'massage':'something went wrong'
  })
})

})

module.exports =router;

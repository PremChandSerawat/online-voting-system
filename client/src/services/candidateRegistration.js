
const axios = require('axios');
var store=require('./store');
 const response= (userData)=>{
  var result;
   console.log("userdata name",userData);
  axios.post("/rest/candidateRegistration",{
    name:userData.name,
    email:userData.email,
    password:userData.password,
    post:userData.post,
  })
    .then(response=> {
     console.log("then block of axios");
      //store.dispatch({type:'voterRegistration'
      result=response.data.massage;
    console.log("result.massage",result);
      alert(result);
      })

    //})
    .catch((error)=> {
      console.log('registration fail');
      alert('registration fail');
//       console.log(error);
// store.dispatch({type:'voterRegistration',payload:error.data.massage});
    })
    return result;
};
module.exports =response;

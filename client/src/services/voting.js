
const axios = require('axios');
 export function response(userData){
  var otp;
   console.log("userdata name",userData);
  axios.post("/rest/voting",{
    voterEmail:userData.voterEmail,
    password:userData.password,
    post:userData.post,
    canditateEmail:userData.canditateEmail,
  })
    .then(response=> {
     console.log("then block of axios");
      //store.dispatch({type:'voterRegistration'
      otp=response.data.otp;
    console.log("result.massage",otp);
      })

    //})
    .catch((error)=> {
      console.log('registration fail');
      alert('registration fail');
      return 0;
    })
    return otp;
};

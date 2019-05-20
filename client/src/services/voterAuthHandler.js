
const axios = require('axios');
 const response= (email,status)=>{
   var list;
   console.log("email",email);
   console.log("status",status);
  axios.post("/rest/voterStatus",{
    email:email,status:status,
  })
    .then(response=> {
     console.log("voterlist axios");
      //store.dispatch({type:'voterRegistration'
      console.log("response",response.data);
      list.prototype.voters=response.data;
      //,payload:response.data.massage});
    //  store.subscribe(()=>{
   //console.log("store updated",store.getState());
      })

    //})
    .catch((error)=> {
      console.log('error',error);
//       console.log(error);
// store.dispatch({type:'voterRegistration',payload:error.data.massage});
    })
return list;
};
module.exports =response;

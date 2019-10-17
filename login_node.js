
// resp -- data | status | statusText | headers | config | request


var host= 'https://sdk-accounts.trueid.net/signin?device=android&state=821&code_challenge=JyOPuQDm900v4LBnkGeoB-pXEY5hwi3x_tNI8YPO8Ug&code_challenge_method=S256&client_id=212&redirect_uri=http://home.trueid.net&device_id=aa79957c1653f705&device_model=m20note&latlong=0,0&ip_address=0.0.0.0&flow=A&lang=en&scope=public_profile,mobile,email,references,&root_token=1';
var step_1 = 'https://cms-sccmixer-dmpapi.trueid.net/pk-sccmixer/v2/?ssoid=1043868&api_key=dPLAN68hrKpPiww9ulfd3DmxXEriL051glLKCKBmS5I';
var step = 'https://cms-sccmixer-dmpapi.trueid.net/pk-sccmixer/v2';


const axios = require('axios');

const getBreeds = async () => {
  try {
    return await axios.get(step, {
      params: {
        ssoid:'1043868',
        api_key:'dPLAN68hrKpPiww9ulfd3DmxXEriL051glLKCKBmS5I'
      },
      headers:{
       // Cookie: 'tids=tne1fo8qf496lkqk6kh8ur4136rg74so',
        Authorization:'Bearer 5aaf9ade15afe0324400bacc8ba1d289d5e44b9d8b0906615436d93f',
        responseType:'application/json'
      
      }
    }).then(   // respose data,status,statusText,headers
      response => { 
        console.log('status code : ', response.data.code)
        console.log('status message : ', response.data.message)
        dataRes = Object.values(response.data.data)
        extRes = Object.values(response.data.ext_response)
        dataRes.map((item,i)=> console.log(item))
        //console.log('message = ', response.data.message)
        //console.log('response code = ' ,response.data.code)
        //console.log(response.data.data.regular.movie)
        extRes = response.data.ext_response
        subScription = Object.values(extRes)
        //console.log('ext response = ',extRes)
        //console.log('subscription ', subScription[0])
        //console.log('Test 1' , Object.keys(extRes).map(function(e){ return extRes[e]}))

        //console.log(subScription)
        //console.log(response.data.data)
        //console.log('All response Data = ',response.data)
        for (key in extRes){
          //console.log(extRes[key].code)
        }
        //subScription.map((item,i)=> console.log(item.code,item.message))


        console.log('--------------------')
        let strangerThings = [{
          name: 'Dustin',
          age: 13
        }, {
          name: 'Mike',
          age: 12
        },
        {
          name: 'Eleven',
          age: 11
        }];
        
        console.log(strangerThings)
        let characters = strangerThings.map(function (character, index, array) {
          return character.name; 
        });
        console.log(characters);

      }      
    )

  } catch (error) {
   console.error(error)
  }
}


getBreeds();






host = 'https://discover.dmpcdn.com/discover/tid_discover_page/content_list/popular_movies.json'
aaa_host = 'https://sdk-accounts.trueid.net/signin'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const axios = require('axios');
const getMovieHit = async () => {
    try {
        return await axios.get (host,{
            params: {},
            headers: {
                'User-Agent': 'okhttp/3.10.0',
                'Accept-Encoding':'gzip/deflate'
            }
        }).then ( response => {
            console.log('status code : ', response.status)
           if (response.status == 200) {
               data = Object.values(response.data)
              let movieHitTitle = data.map((data) => data.primary.title_en )
              let movieHitID = data.map((data) => data.primary.info.cms_id )
              console.log(movieHitTitle.length)
              console.log(movieHitTitle[0] , '---', movieHitID[0])
           }
        })
    } catch (error) {
        console.log('catch error : ', error)
    }
}

const deviceSignin = async () => {
    try {
        return await axios.get( aaa_host,{
            params: {
                'device':'android',
                'state':'821',
                'code_challenge':'JyOPuQDm900v4LBnkGeoB-pXEY5hwi3x_tNI8YPO8Ug',
                'code_challenge_method':'S256',
                'client_id':'212',
                'redirect_uri':'http://home.trueid.net',
                'device_id':'aa79957c1653f705',
                'device_model':'m20%20note',
                'latlong':'0.0',
                'ip_address':'0.0.0.0',
                'flow':'A',
                'lang':'en',
                'scope':'public_profile,mobile,email,references,',
                'root_token':'1'
           },
            headers: {
                'host':'sdk.account.trueid.net',
                'Connection':'close',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Upgrade-Insecure-Requests':'1',
                'User-Agent':'Mozilla/5.0 (Linux; Android 5.1; m2 note Build/LMY47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.147 Mobile Safari/537.36',
                'Accept-Encoding':'gzip, deflate',
                'Accept-Language':'en-US',
                'X-Requested-With': 'com.tdcm.trueidapp'
            }
        }).then ( response => {
            if (response.status == 200) {
                let resHeader = Object.values(response.headers)
                console.log(resHeader)
                 //headerObj = response.headers
                  console.log(response.headers.set-cookie[0])
               // let resHeaderArr = resHeader.map((resHeader) => resHeader.set-cookie)
            }
            
        })

    } catch (error){
        console.log('catch error : ', error)
    }
}

deviceSignin()
//getMovieHit()
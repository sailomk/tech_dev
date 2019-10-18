host = 'https://discover.dmpcdn.com/discover/tid_discover_page/content_list/popular_movies.json'
aaa_host = 'https://sdk-accounts.trueid.net/signin'
ch_host = 'https://cms-fn-dmpapi.trueid.net/cms-fnshelf/v1/vdd78mEQYEv?fields=channel_code,thumb,channel_info,subscription_package,subscription_tiers,subscriptionoff_requirelogin,drm,is_premium,true_vision,ads_webapp,lang_dual,subtitle,catch_up,allow_catchup,time_shift,allow_timeshift,epg_flag'

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
                  console.log(response.headers['set-cookie'][0])
            }           
        })
    } catch (error){
        console.log('catch error : ', error)
    }
}

const master = async () =>  {
    try {
        return await axios.get( aaa_host,{
            params: {},
            headers: {}
        }).then ( response => {

               })
    } catch (error) {
        console.log('catch error : ', error)
    }
}

const getAllCh = async () =>  {
    try {
        return await axios.get( ch_host,{
            params: {},
            headers: {
                'Authorization':'Bearer 5aaf9ade15afe0324400bacc26115aba3ac9493faf4f27ff957620c2',
                'Content-Type':'application/json',
                'User-Agent':'okhttp/3.10.0'
            }
        }).then ( response => {
            if (response.status == 200) {
                console.log("Result success code =" , response.data.code , " -- " , response.data.data.update_date)
                console.log("we get",response.data.data.shelf_items.length, "channels")
                ch_Listing = Object.values(response.data.data.shelf_items)
                let ch_ID = ch_Listing.map((ch_Listing) => ch_Listing.id)
                let ch_Title = ch_Listing.map((ch_Listing) => ch_Listing.title)
                let ch_Code = ch_Listing.map((ch_Listing) => ch_Listing.channel_code)
                console.log(ch_ID,ch_Title,ch_Code)


            } else {
                console.log("Result error code = " , response.data.code)
            }

               })
    } catch (error) {
        console.log('catch error : ', error)
    }
}


getAllCh()
//deviceSignin()
//getMovieHit()
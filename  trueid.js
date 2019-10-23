var host = 'https://discover.dmpcdn.com/discover/tid_discover_page/content_list/popular_movies.json'
var aaa_host = 'https://sdk-accounts.trueid.net/signin'
var ch_host = 'https://cms-fn-dmpapi.trueid.net/cms-fnshelf/v1/vdd78mEQYEv?fields=channel_code,thumb,channel_info,subscription_package,subscription_tiers,subscriptionoff_requirelogin,drm,is_premium,true_vision,ads_webapp,lang_dual,subtitle,catch_up,allow_catchup,time_shift,allow_timeshift,epg_flag'
var picker_onprem_host = 'https://cms-streamer-dmpapi.trueid.net/pk-streamer/v2/streamer'
var picker_gcp_host = 'https://35.244.252.52/pk-streamer/v2/streamer'
var cms_id_arr 
var _ = require('loadsh')
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



const getStreamingStatus = async (cms_id,cms_title,app_id,user_uid,host) =>  {
    try {
        return await axios.get( host,{
            params: {
                //'id':'AlPo3NzNZa62',
                'id':cms_id,
                'lang':'',
                'langid':'th',
                'fields':'setting,allow_chrome_cast,subscriptionoff_requirelogin,subscription_package,subscription_tiers,channel_info,count_views,count_likes,ads,black_out,blackout_start_date,blackout_end_date,blackout_message,mix_no,is_premium,true_vision,teaser_channel,geo_block,time_shift,allow_timeshift,allow_catchup,packages,drm,slug,catchup,allow_catchup,time_shift,allow_timeshift,lang_dual,remove_ads',
                'appid':app_id,
                'visitor':'mobile',
                'os':'android',
                'type':'live',
                'stremlvl':'auto',
                'ep_items':'',
                'uid':user_uid,
                'access':'login',
                'stime':'',
                'duration':''
            },
            headers: {
                'Authorization':'Bearer 5aaf9ade15afe0324400bacc26115aba3ac9493faf4f27ff957620c2',
                'Content-Type':'application/json',
                'User-Agent':'okhttp/3.10.0'
            }
        }).then ( response => {

            /*
            if (_.get(response,'data.ext_code') == 200){
                //console.log(_.get(response,'data.ext_msg') , "," , _.get(response,'data.data.stream.stream_url'))
                console.log(_.get(response,'data.ext_msg') , "," ,cms_title, ", ", _.get(response,'data.data.stream.stream_url'))
            } else {
                console.log(_.get(response,'data.ext_code'),_.get(response,'data.ext_msg'),cms_title) 
            }
            */
        })

        //xxxxxx
        _.filter(response,function(o){
            if (o.drm == "AES_128" ){
                console.log(o.title)
            }})

    } catch (error) {
        console.log('catch error : ', error)
    }
}

const getStreamingURL = async (cms_id,cms_title,app_id,user_uid,host) =>  {
    try {
        return await axios.get( host,{
            params: {
                //'id':'AlPo3NzNZa62',
                'id':cms_id,
                'lang':'',
                'langid':'th',
                'fields':'setting,allow_chrome_cast,subscriptionoff_requirelogin,subscription_package,subscription_tiers,channel_info,count_views,count_likes,ads,black_out,blackout_start_date,blackout_end_date,blackout_message,mix_no,is_premium,true_vision,teaser_channel,geo_block,time_shift,allow_timeshift,allow_catchup,packages,drm,slug,catchup,allow_catchup,time_shift,allow_timeshift,lang_dual,remove_ads',
                'appid':app_id,
                'visitor':'mobile',
                'os':'android',
                'type':'live',
                'stremlvl':'auto',
                'ep_items':'',
                'uid':user_uid,
                'access':'login',
                'stime':'',
                'duration':''
            },
            headers: {
                'Authorization':'Bearer 5aaf9ade15afe0324400bacc26115aba3ac9493faf4f27ff957620c2',
                'Content-Type':'application/json',
                'User-Agent':'okhttp/3.10.0'
            }
        }).then ( response => {
            if (_.get(response,'data.ext_code') == 200){
                //console.log(_.get(response,'data.ext_msg') , "," , _.get(response,'data.data.stream.stream_url'))
                console.log(_.get(response,'data.ext_msg') , "," ,cms_title, ", ", _.get(response,'data.data.stream.stream_url'))
            } else {
                console.log(_.get(response,'data.ext_code'),_.get(response,'data.ext_msg'),cms_title) 
            }
        })
    } catch (error) {
        console.log('catch error : ', error)
    }
}

const getAllCh_loadsh = async () =>  {
    try {
        
        return  await axios.get( ch_host,{
            params: {},
            headers: {
                'Authorization':'Bearer 5aaf9ade15afe0324400bacc26115aba3ac9493faf4f27ff957620c2',
                'Content-Type':'application/json',
                'User-Agent':'okhttp/3.10.0'
            }
        }).then ( response => {
            /*if ( _.has(response,'data.data.')){ console.log('I found key lang ')} else { console.log('Not thing found')}
            console.log(_.get(response,'data.data.shelf_items'))
            console.log(_.pickBy(response,_.isString))
            console.log(_.pickBy(response,_.isInteger))
            console.log(_.pickBy(response,_.isArray))
            console.log(_.pickBy(response,_.isObject))
            console.log(_.pickBy(response.data.data.shelf_items,_.isObject))
            */
            if ((_.get(response,'status') == 200)) {                
                console.log("Result success code =" , _.get(response,'data.code') , " -- " , _.get(response,'data.data.update_date'))
                console.log("We get ",_.size(response.data.data.shelf_items)," channels")
                let ch_list = _.get(response,'data.data.shelf_items')
                /*
                _.forEach(ch_list,function(value){
                    console.log(value.id,value.title,value.channel_info.channel_name_eng)
                })
                
                _.filter(ch_list,function(o) {
                    if (o.subscription_tiers == "premium") {
                        console.log(o.drm)
                    }
                })

                _.filter(ch_list,function(o){
                    if (o.drm == "AES_128" ){
                        console.log(o.title)
                    }
                })
                */
               //cms_id_arr = ch_list.id
               console.log(ch_list)
            cms_id_arr = _.pick(ch_list,['id'] )
            console.log(cms_id_arr)
              //var onlyCmsID = _.find(ch_list,{id})



               _.forEach(ch_list,function(value){
                //console.log(value.id,value.title,value.channel_info.channel_name_eng)
                //getStreamingURL(value.id,value.title,'trueid','12345',picker_onprem_host)
                //getStreamingStatus(value.id,value.title,'trueid','12345',picker_onprem_host)
                //cms_id_arr = value.id

            })

            } else {
                console.log("Result error code = " , response.data.code)
            }

               })
    } catch (error) {
        console.log('catch error : ', error)
    }
}


function evaluteStreamingStatus (cms_id,app_id,user_uid,host){
    //var instance = axios.create({baseURL: host})
    /*
    instance.get('/list').then(function (response) {
        console.log('main todo');
        console.log("response total %s <",response.data.length);
      }).catch(function (error) {
        console.log("if error");
      })    http://zetcode.com/javascript/axios/
      */
    
    var params = {
        'id':cms_id,
        'lang':'',
        'langid':'th',
        'fields':'setting,allow_chrome_cast,subscriptionoff_requirelogin,subscription_package,subscription_tiers,channel_info,count_views,count_likes,ads,black_out,blackout_start_date,blackout_end_date,blackout_message,mix_no,is_premium,true_vision,teaser_channel,geo_block,time_shift,allow_timeshift,allow_catchup,packages,drm,slug,catchup,allow_catchup,time_shift,allow_timeshift,lang_dual,remove_ads',
        'appid':app_id,
        'visitor':'mobile',
        'os':'android',
        'type':'live',
        'stremlvl':'auto',
        'ep_items':'',
        'uid':user_uid,
        'access':'login',
        'stime':'',
        'duration':''
    }

    var headers = {
        'Authorization': 'Bearer 5aaf9ade15afe0324400bacc26115aba3ac9493faf4f27ff957620c2',
        'Content-Type': 'application/json',
        'User-Agent': 'okhttp/3.10.0'
    }
     axios.get(host,{params,headers})
     .then (function(response){
         console.log(response)
     })
     .catch (function (error){
         console.log(error)
     })
     .finally(function(){
         //always execute
     })
     //axios.get(URL, { params:{}, headers: { 'Authorization': AuthStr } })
}

function loopArray(cms_id_arr) {
    _.forEach(id, id => {
        console.log(id)
    })
}

async function main(){
    try{
        var  result = await getAllCh_loadsh()
        console.log(cms_id_arr)
        console.log(_.isObject(cms_id_arr))
        console.log(_.size(cms_id_arr))
        _.forEach(cms_id_arr, function(key,value){
            console.log(key ,value)
        })

        
       // console.log(cms_id_arr)

    }catch (error) {
        console.log(error)
    }
}

main()

//console.log("Done")
//deviceSignin()
//getMovieHit()
//getStreamingURL('AlPo3NzNZa62','trueidz','12345',picker_onprem_host)

//console.log(callStreamer('AlPo3NzNZa62',picker_gcp_host))
//evaluteStreamingStatus('AlPo3NzNZa62','trueid','12345',picker_onprem_host)

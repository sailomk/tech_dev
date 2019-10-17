<?php
// Login TRUEID
// V 1.0 | Oct 04,2019 | KTP


$HOST='https://sdk-accounts.trueid.net';
$DEVICE_SIGNIN = '/signin?device=android&state=821&code_challenge=JyOPuQDm900v4LBnkGeoB-pXEY5hwi3x_tNI8YPO8Ug&code_challenge_method=S256&client_id=212&redirect_uri=http://home.trueid.net&device_id=aa79957c1653f705&device_model=m9%20note&latlong=0,0&ip_address=0.0.0.0&flow=A&lang=en&scope=public_profile,mobile,email,references,&root_token=1';
//$DEVICE_SIGNIN= '/signin?device=android&state=821&code_challenge=JyOPuQDm900v4LBnkGeoB-pXEY5hwi3x_tNI8YPO8Ug&code_challenge_method=S256&client_id=212&redirect_uri=http://home.trueid.net&device_id=aa79957c1653f705&device_model=m2%20note&latlong=0,0&ip_address=0.0.0.0&flow=A&lang=en&scope=public_profile,mobile,email,references,&root_token=1';
//signin/permissions?device
$DEVICE_PERM = '/signin/permissions?device=android&state=821&code_challenge=JyOPuQDm900v4LBnkGeoB-pXEY5hwi3x_tNI8YPO8Ug&code_challenge_method=S256&client_id=212&redirect_uri=http://home.trueid.net&device_id=aa79957c1653f705&device_model=m9%20note&latlong=0,0&ip_address=0.0.0.0&flow=A&lang=en&scope=public_profile,mobile,email,references,&root_token=1';
/*
$UID = 5182999;  //E'Ju
$user = '0863483334';
$pass = 'paiboon2705';
*/


$UID=1043868;  // Air
$user = 'sailom.k@gmail.com';
$pass = 'leibboos';




//Initialize cURL.
$curl = curl_init();

//Set the URL that you want to GET by using the CURLOPT_URL option.
curl_setopt($curl, CURLOPT_URL, $HOST.$DEVICE_SIGNIN);
 
//Set CURLOPT_RETURNTRANSFER so that the content is returned as a variable.
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
 
//Set CURLOPT_FOLLOWLOCATION to true to follow redirects.
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);

curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Host: sdk-accounts.trueid.net',
    'Connection: close',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Upgrade-Insecure-Requests: 1',
    'User-Agent: Mozilla/5.0 (Linux; Android 5.1; m9 note; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.147 Mobile Safari/537.36',
    'Accept-Encoding: gzip, deflate',
    'Accept-Language: en-US',
    'X-Requested-With: com.tdcm.trueidapp'
    ));

curl_setopt($curl, CURLOPT_HEADER, 1);
//Execute the request.
$data = curl_exec($curl);


//Close the cURL handle.
curl_close($curl);


preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $data, $matches);

$cookies = array();
foreach($matches[1] as $item) {
    parse_str($item, $cookie);
    $cookies = array_merge($cookies, $cookie);
}
//var_dump($cookies);
$csrf_cookie_aaa = $cookies['csrf_cookie_aaa'];
$tids = $cookies['tids'];

echo 'csrf_cookie_aaa => '.$csrf_cookie_aaa."\n";
echo 'tids => '.$tids."\n";

//$POST_DATA='account=0863483334&password=paiboon2705&ck=6147eb917811e2846d9d482b7de203c7fa4147f6&csrf_token_aaa=41e68d40a57e19738aa60aabe5984317';
$post_cookie = 'csrf_cookie_aaa='.$csrf_cookie_aaa.'; tids='.$tids.'; _ga=GA1.3.379018106.1570157035; _gid=GA1.3.260135028.1570157035; _gat_UA-86733131-22=1';
//$post_cookie = 'tids='.$tids;

//$post_data = 'account=0863483334&password=paiboon2705&ck='.$tids.'&csrf_token_aaa='.$csrf_cookie_aaa;
$post_data = 'account='.$user.'&password='.$pass.'&ck='.$tids.'&csrf_token_aaa='.$csrf_cookie_aaa;



file_put_contents('login.txt', $post_data);
file_put_contents('cookie.txt', $post_cookie);

echo "post_cookie = ". $post_cookie."\n";
echo "post_data = ".$post_data."\n\n\n";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  curl_setopt($ch, CURLOPT_POSTFIELDS, file_get_contents(‘/path/to/file’) );


//url_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$data = array(
    'account' => $user,
    'password' => $pass,
    'ck' => $tids,
    'csrf_token_aaa' => $csrf_cookie_aaa
);



$postdata = http_build_query(
    array(
    'account' => '',
    'password' => '',
    'ck' => $tids,
    'csrf_token_aaa' => $csrf_cookie_aaa
    )
);


$opts = array('http' =>
    array(
        'method'           => 'POST',
        'follow_location'  => false ,
        'header'           => 'User-Agent: Mozilla/5.0 (Linux; Android ุ6.1; note ; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.147 Mobile Safari/537.36',
        //'header'           => 'Content-Type: application/x-www-form-urlencoded',
        //'Accept'           => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        //'Accept-Encoding'  => 'gzip, deflate',
        //'Cache-Control'    => 'max-age=0',
        //'Accept-Language'  => 'en-US',
        'Host'             => 'sdk-accounts.trueid.net',
        //'Origin'           => 'https://sdk-accounts.trueid.net',
        //'Referer'          => 'https://sdk-accounts.trueid.net/signin?device=android&state=821&code_challenge=JyOPuQDm900v4LBnkGeoB-pXEY5hwi3x_tNI8YPO8Ug&code_challenge_method=S256&client_id=212&redirect_uri=http://home.trueid.net&device_id=aa79957c1653f705&device_model=m2%20note&latlong=0,0&ip_address=0.0.0.0&flow=A&lang=en&scope=public_profile,mobile,email,references,&root_token=1',
        //'Upgrade-Insecure-Requests' => '1',
        //'User-Agent'       => 'Mozilla/5.0 (Linux; Android ุ6.1; note ; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.147 Mobile Safari/537.36',
        //'X-Requested-With' => 'com.tdcm.trueidapp',
        //'cache-control'    => 'no-cache',
        //'cookie'          => $post_cookie,
        'content'          => $postdata
    )
);


$context  = stream_context_create($opts);
var_dump($context);

//$result = file_get_contents($HOST.$DEVICE_SIGNIN, false, $context);

var_dump($http_response_header);



$fp = fopen($HOST.$DEVICE_SIGNIN, 'r');
$meta_data = stream_get_meta_data($fp);
var_dump($meta_data);
foreach ($meta_data['wrapper_data'] as $response) {

    /* Were we redirected? */
    if (strtolower(substr($response, 0, 10)) == 'location: ') {

        /* update $url with where we were redirected to */
        $url = substr($response, 10);
    }

}


var_dump($response);

//Print the data out onto the page.
//echo $data;

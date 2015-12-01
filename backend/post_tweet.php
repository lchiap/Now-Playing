<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

$settings = array(
    'oauth_access_token' => "2834545563-QYQqm8hnLPiU3eFyAD8SGtKhfIYW7gMp8fGh8Xd",
    'oauth_access_token_secret' => "SUquQt3XC2ve3IIa8JbwMa4bsRCpZSJuCVKYAXLUTDBBT",
    'consumer_key' => "CXVNsTDohsJaIxl0cjpuLKXYr",
    'consumer_secret' => "Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB"
);


$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=#nowplaying youtube&count=6';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetfield($getfield)->buildOauth($url, $requestMethod)->performRequest();
header('Content-Type: application/json');
echo $response;

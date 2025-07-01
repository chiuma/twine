<?php

 
$allowed_origins = array(
    'http://192.168.1.100:3000',
    'http://localhost:3000' , 
);
 
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
   header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
} else {
 		header("Access-Control-Allow-Origin: https://www.cimicapp.com");    
}
 
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");  
header("Access-Control-Expose-Headers: Authorization, Content-Type, X-My-Custom-Header, Location");
 
?>

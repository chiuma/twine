<?php

error_reporting(0);


require_once "./JwtConfig.php";
 
 
header('Content-Type: application/json; charset=utf-8');

try
{ 
	include_once './db_config.php';		
 
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$email =  trim($obj["email"]) ; 	
	$password = trim( $obj["password"] ); 	
// afcanforever - afcannumberone
	$password_hashed = hash('ripemd160',  $password   ); 
	if ( 
	( $email === "admin" && $password_hashed == "c1ea5340fa380dc5b37556bcb4b30807f8dfd9c9")
	||
	( $email === "fulladmin" && $password_hashed == "e8cbaf47ae9ab9f753520b8bdc65687bb3757457")
	)
	{
		$token =  JwtConfig::makeToken( null ); 
		
		header('Authorization: '.$token);		
		$json_response =  array ('esito' => "OK"  );	
	}
	else
	{
		
		$json_response =  array ('esito' => "NOT_OK",   'err_code' => '002'   );	
	}
	
	
	 
		 
	echo json_encode( $json_response); 	
} 
catch (Exception $e) 
{

 	$json_response    =  array( 			         						         		  	  					         							   					         		
			'esito' => 'NOT_OK',			   		
			'err_code' => "001"  ,	
 
			'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response); 	
  	
}	
	
?>

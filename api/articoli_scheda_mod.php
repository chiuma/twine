<?php

error_reporting(0);
require_once "./JwtConfig.php";
require_once "./cors.php"; 
header('Content-Type: application/json; charset=utf-8');

$sql = "";

function isCodiceEsiste($conn, $codice, $id_articolo_base)
{
 	$sql = 	" SELECT count(*)    " .
	" FROM   articoli_base " . 
 	" WHERE articoli_base.codice = '" .addslashes($codice) ."' ". 
	" AND articoli_base.id_articolo_base != ".$id_articolo_base;
		  
	$statement = $conn->prepare($sql);
	$statement->execute();  
	$conteggio = $statement->fetchColumn();
 
	if ( $conteggio > 0 )
		return true; 		
 
	else
		return false;
}

function isAricoloCancellabile($conn, $id_articolo_base)
{
 	$sql = 	" SELECT count(*)    " .
	" FROM   ordini_dettaglio " .
	 " WHERE ordini_dettaglio.id_articolo_base =" .$id_articolo_base;
		  
	$statement = $conn->prepare($sql);
	$statement->execute();  
	$conteggio = $statement->fetchColumn();
 
	if ( $conteggio > 0 )
		return false; 		
 
	else
		return true;
}


 


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
	$prezzo = trim($scheda["prezzo"]);
	$id_articolo_base = $scheda["id_articolo_base"];
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if ($action == "DEL_ARTICOLO" )
	{

		$id_articolo_base =  trim($obj["id_articolo_base"]);
		if ( isAricoloCancellabile( $conn , $id_articolo_base))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "003"  	 );
			echo json_encode( $json_response);die();
		}
 
		$sql = "DELETE FROM articoli_base "
			. " WHERE id_articolo_base = " .trim($obj["id_articolo_base"]);
			
	}
	  
	else if ($id_articolo_base ===  -1 )
	{
		if ( isCodiceEsiste($conn, $codice, $id_articolo_base ))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "004"  	 );
			echo json_encode( $json_response);die();
		}
		
		$new_id = DbGetNewId ($conn, "articoli_base", "id_articolo_base") + 1;
	
						
		$sql = "INSERT INTO articoli_base ( id_articolo_base, descrizione, codice, prezzo) "
			. " VALUES ("						
			. $new_id. ","
			. "'" . addslashes ($descrizione) . "'" 
			. "," .  "'" . addslashes ($codice) . "'"
			. "," .   addslashes ($prezzo) 
			. ")";
	}
	else
	{
		if ( isCodiceEsiste($conn, $codice, $id_articolo_base ))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "004"  	 );
			echo json_encode( $json_response);die();
		}
				
		$sql = "UPDATE articoli_base SET  " 
			. " descrizione = " . "'" . addslashes ($descrizione) . "'" 
			. "," .  "codice = " . "'" . addslashes ($codice) . "'"
			. "," . "prezzo = " .    $prezzo  
			. " WHERE id_articolo_base=".$id_articolo_base;
	}
 	$conn->exec($sql) ;
	$json_response =  array ('esito' => "OK" );
	 
	if ($id_articolo_base ===  -1   ) $json_response["new_id"] = $new_id;
 
 
		 
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

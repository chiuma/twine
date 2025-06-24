<?php

error_reporting(0);
require_once "./JwtConfig.php";
 require_once "./cors.php";
header('Content-Type: application/json; charset=utf-8');

$sql = "";


function isCodiceEsiste($conn, $codice, $id_colore)
{
 	$sql = 	" SELECT count(*)    " .
	" FROM   colori " . 
 	" WHERE colori.codice = '" .addslashes($codice) ."' ". 
	" AND colori.id_colore != ".$id_colore;
		  
	$statement = $conn->prepare($sql);
	$statement->execute();  
	$conteggio = $statement->fetchColumn();
 
	if ( $conteggio > 0 )
		return true; 		
 
	else
		return false;
}

function isColoreCancellabile($conn, $id_colore)
{
 
 	$sql = "SELECT  count(*)   from   ordini_dettaglio ". 
			" WHERE id_colore=" .$id_colore . " OR id_colore_2=".$id_colore . " OR id_colore_3=".$id_colore;
		  
	$statement = $conn->prepare($sql);
	$statement->execute();  
	$conteggio = $statement->fetchColumn();
 
 // echo "conteggio=".$conteggio."<br>";
 
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
 
	$id_colore = $scheda["id_colore"];
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	
	if ($action == "DEL_COLORE" )
	{
		$id_colore =  trim($obj["id_colore"]);
		 
	 
		if ( !isColoreCancellabile($conn, $id_colore ))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "003"  	 );
			echo json_encode( $json_response);die();
		}
				
 
			
		$sql = "DELETE FROM colori "  
			. " WHERE id_colore=".$id_colore;
	 
			
	}
	else	if ($id_colore ===  -1 )
	{
		if ( isCodiceEsiste($conn, $codice, $id_colore ))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "004"  	 );
			echo json_encode( $json_response);die();
		}
				
				
		
		
		$new_id = DbGetNewId ($conn, "colori", "id_colore") + 1;
	
						
		$sql = "INSERT INTO colori ( id_colore, descrizione, codice) "
			. " VALUES ("						
			. $new_id. ","
			. "'" . addslashes ($descrizione) . "'" 
			. "," .  "'" . addslashes ($codice) . "'" 
			. ")";
	}
	else
	{
		if ( isCodiceEsiste($conn, $codice, $id_colore ))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "004"  	 );
			echo json_encode( $json_response);die();
		}
				
				
								
		$sql = "UPDATE colori SET  " 
			. " descrizione = " . "'" . addslashes ($descrizione) . "'" 
			. "," .  "codice = " . "'" . addslashes ($codice) . "'" 
			. " WHERE id_colore=".$id_colore;
	}
 	$conn->exec($sql) ;
	$json_response =  array ('esito' => "OK" );
	 
	if ($id_colore ===  -1 ) $json_response["id_colore"] = $new_id;
 
		 
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

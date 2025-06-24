<?php

error_reporting(0);
require_once "./cors.php"; 
header('Content-Type: application/json; charset=utf-8');

$sql = "";

function isClienteCancellabile($conn, $id_cliente)
{
 
 	$sql = "SELECT  count(*)   "
 		. "	FROM ordini_dettaglio  "
		. "	INNER  JOIN ordini "
		. "	ON ordini_dettaglio.id_ordine = ordini.id_ordine  "
		.	" WHERE ordini.id_cliente=" .$id_cliente;
		  
	$statement = $conn->prepare($sql);
	$statement->execute();  
	$conteggio = $statement->fetchColumn(); 
 
	if ( $conteggio > 0 )
	{	return false; 		}
  	 
	else
		return true;
	
}


try
{
	include_once './db_config.php';		
	
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$scheda =  $obj["scheda"] ; 	
	
	$descrizione = trim($scheda["descrizione"]);
	$piva = trim($scheda["piva"]);
	$telefono = trim($scheda["telefono"]);
	$id_cliente = $scheda["id_cliente"];
	
	$codfiscale = trim($scheda["codfiscale"]);
	$email = trim($scheda["email"]);
	$cap = $scheda["cap"];
	
	
		$comune = trim($scheda["comune"]);
	$provincia = trim($scheda["provincia"]);
	$indirizzo = trim($scheda["indirizzo"]);
	$cellulare = trim($scheda["cellulare"]);
	$indirizzo_legale  = trim($scheda["indirizzo_legale"]);
	
	
	$action = trim($obj["action"]);
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	
	if ($action == "DEL_CLIENTE" )
	{
		$id_cliente =  trim($obj["id_cliente"]);
		if ( !isClienteCancellabile($conn, $id_cliente ))
		{
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "003"  	 );
			echo json_encode( $json_response);die();
		}
		
				
		$sql = "DELETE FROM clienti    "  
			. " WHERE id_cliente=".$id_cliente;
	 
			
	}
	elseif ($id_cliente ===  -1 )
	{
		$new_id = DbGetNewId ($conn, "clienti", "id_cliente") + 1;
	
						
		$sql = "INSERT INTO clienti ( id_cliente, descrizione, piva, telefono, cellulare, "
			. " codfiscale, email, cap, comune, provincia, indirizzo, indirizzo_legale) "
			. " VALUES ("						
			. $new_id
			.  "," ."'" . addslashes ($descrizione) . "'" 
			. " ," .  "'" . addslashes ($piva) . "'"
			. "," . "'" . addslashes ($telefono) . "'"
			. "," . "'" . addslashes ($cellulare) . "'"
			. ","  . "'" . addslashes ($codfiscale) . "'" 
			. "," .  "'" . addslashes ($email) . "'"
			. "," . "'" . addslashes ($cap) . "'"
			
			. "," . "'" . addslashes ($comune) . "'" 
			. "," .  "'" . addslashes ($provincia) . "'"
			. "," . "'" . addslashes ($indirizzo) . "'"
			. "," . "'" . addslashes ($indirizzo_legale) . "'"			
			. ")";
	}
	else
	{
								
		$sql = "UPDATE clienti SET  " 
			. " descrizione = " . "'" . addslashes ($descrizione) . "'" 
			. "," .  "piva = " . "'" . addslashes ($piva) . "'"
			. "," . "telefono = " . "'" . addslashes ($telefono) . "'"
			. "," . "cellulare = " . "'" . addslashes ($cellulare) . "'"
			. " , codfiscale = " . "'" . addslashes ($codfiscale) . "'" 
			. "," .  "email = " . "'" . addslashes ($email) . "'"
			. "," . "cap = " . "'" . addslashes ($cap) . "'"
			
			. ", comune = " . "'" . addslashes ($comune) . "'" 
			. "," .  "provincia = " . "'" . addslashes ($provincia) . "'"
			. "," . "indirizzo = " . "'" . addslashes ($indirizzo) . "'"
			. "," . "indirizzo_legale = " . "'" . addslashes ($indirizzo_legale) . "'"	
			. " WHERE id_cliente=".$id_cliente;
	}
 
 	$conn->exec($sql) ;
	$json_response =  array ('esito' => "OK" );
	 
	if ($id_cliente ===  -1 ) $json_response["id_cliente"] = $new_id;
 
		 
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

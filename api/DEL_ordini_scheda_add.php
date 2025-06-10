<?php

error_reporting(0);
require_once "./JwtConfig.php";
header('Content-Type: application/json; charset=utf-8');

$sql = "";
 
$conn;

try
{
	
	 

	
	$authCheck = JwtConfig::checkToken();
	if (  $authCheck["esito"] === "NOT_OK")
	{
		echo json_encode( $authCheck); 	
		die();
	}
		
		
	include_once './db_config.php';		
	
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$scheda =  $obj["scheda"] ; 	
	 
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
 

	$log = "";
	 
	$newID =  DbGetNewId ($conn, "ordini_dettaglio", "id_ordine_dettaglio") + 1;
	$scheda["id_ordine_dettaglio"] = $newID;
	

	$sql = "INSERT INTO ordini_dettaglio "
		. " (id_ordine_dettaglio, id_ordine,  id_articolo_base, id_colore, id_colore_2,id_colore_3,   qta,  prezzo,  data_consegna, evaso, nota )" 
		. " VALUES ("
		. $newID 
		. "," . $scheda["id_ordine"]  
		. ",  " .    $scheda["id_articolo_base"] 
		. ",  " .    $scheda["id_colore"] 
		. ",  " .   ($scheda["id_colore_2"] != "-1" && $scheda["id_colore_2"] != "" ?  $scheda["id_colore_2"]   :  " null " )  
		. ",  " .  ( $scheda["id_colore_3"] != "-1" && $scheda["id_colore_3"] != ""  ?  $scheda["id_colore_3"]   :  " null "  )  
		. ",  "  .    $scheda["qta"] 
		. ",  "  .    $scheda["prezzo"]		
		. ", " . "'" . addslashes ($scheda["data_consegna"]) . "'" 		
		. ",  "  .    ( $scheda["evaso"]  == "true" ? "1" : "0")		
		. ", " . "'" . addslashes ($scheda["nota"]) . "'"
	  .")";
		 
	$conn->exec($sql) ;
	$log = $log  . $sql . "  **** "; 

	$json_response =  array ('esito' => "OK"  , 'log' =>  $log, 'scheda'  => $scheda );
	echo json_encode( $json_response); 	
} 
catch (Exception $e) 
{
 
 	$json_response    =  array( 			         						         		  	  					         							   					         		
			'esito' => 'NOT_OK',			   		
			'err_code' => "001"  ,	
			'sql'=> $sql				,
		//	'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response); 	
  	
}	
	
?>

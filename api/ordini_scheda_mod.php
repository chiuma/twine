<?php

error_reporting(0);
 require_once "./JwtConfig.php";
header('Content-Type: application/json; charset=utf-8');

$sql = "";
 
$conn;

try
{
	
	

function isOrdineDettaglioCancellabile($conn, $id_ordine_dettaglio)

{

 	$sql = 	" SELECT count(*)    "  
		. " FROM consegne_dettaglio   "		
		. " where      consegne_dettaglio.id_ordine_dettaglio =  ".$id_ordine_dettaglio;

	$statement = $conn->prepare($sql);

	$statement->execute();  

	$conteggio = $statement->fetchColumn();

	if ( $conteggio > 0 )

		return false; 	

	else

		return true;

}

function isOrdineCancellabile($conn, $id_ordine)

{

 	$sql = 	" SELECT count(*)    "  
		. " FROM ordini_dettaglio   "
		. "	INNER  JOIN consegne_dettaglio 	ON ordini_dettaglio.id_ordine_dettaglio = consegne_dettaglio.id_ordine_dettaglio " 
		. " where      ordini_dettaglio.id_ordine =  ".$id_ordine;

	$statement = $conn->prepare($sql);

	$statement->execute();  

	$conteggio = $statement->fetchColumn();

	if ( $conteggio > 0 )

		return false; 	

	else

		return true;

}

	
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
	
	 
	$action = trim($obj["action"]);
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dettagli =  array ();
	$testata =  array ();

	$log = "";
	if ($action == "ORDINE_DETTAGLIO_ADD" )
	{
	
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
		// $log = $log  . $scheda["id_cliente"]  . "  **** "; 		  
		 		
	}
	else if ($action == "MOD_ORDINE" )
	{
		 	$conn->beginTransaction();
		 	$id_ordine = $obj["scheda"]["id_ordine"];
		 	
		 	
		 	if ( $id_ordine == "-1")
		 	{
		 		$id_ordine =  DbGetNewId ($conn, "ordini", "id_ordine") + 1;
		 		$testata["id_ordine"] = $id_ordine;
				$sql = "INSERT INTO ordini (id_ordine, id_provenienza, id_cliente, data_ricezione) VALUES (   " 
						. $id_ordine
				 		. ","  .    $obj["scheda"]["id_provenienza"]  
				 		. ","  .    $obj["scheda"]["id_cliente"]  
				 		. ", " . "'" . addslashes ($obj["scheda"]["data_ricezione"]) . "'"
				 		. ")";
		 	}
		 	else
		 	{
				$sql = "UPDATE ordini SET  " 
					. " id_provenienza  = " .    $obj["scheda"]["id_provenienza"]
					. "," .  "  	id_cliente  = " .    $obj["scheda"]["id_cliente"]  
	
					. "," .  "data_ricezione  = " . "'" . addslashes ($obj["scheda"]["data_ricezione"]) . "'"
				. " WHERE id_ordine  =".trim($id_ordine);
			}
			 $log = $log  . $sql . "  **** ";

			$conn->exec($sql) ;

			foreach ($obj["scheda"]["ordineDettaglio"] as $scheda) 
			{
				


							
		  	if (trim($scheda["id_ordine_dettaglio"]) != "-1")
		  	{

						$sql = "UPDATE ordini_dettaglio SET  " 
							
							. "   	id_articolo_base  = " .    $scheda["id_articolo_base"] 
							
							. ",  	id_colore  = " .    $scheda["id_colore"] 
							. ",  	id_colore_2  = " .   ($scheda["id_colore_2"] != "-1" && $scheda["id_colore_2"] != "" ?  $scheda["id_colore_2"]   :  " null "  ) 
							. ",  	id_colore_3  = " .  ( $scheda["id_colore_3"] != "-1" && $scheda["id_colore_3"] != "" ?  $scheda["id_colore_3"]   :  " null "  )
														
							
							
							. "," . "qta = "  .    $scheda["qta"] 
							. "," . "prezzo = "  .    $scheda["prezzo"]
							
							. "," .  "data_consegna  = " . "'" . addslashes ($scheda["data_consegna"]) . "'"
							
							
							. "," . "evaso = "  .    ( $scheda["evaso"]  == "true" ? "1" : "0")
							
							. "," . "nota = " . "'" . addslashes ($scheda["nota"]) . "'"
							. " WHERE id_ordine_dettaglio =".trim($scheda["id_ordine_dettaglio"]);
	 			}
	 			else
	 			{
	 					$newID =  DbGetNewId ($conn, "ordini_dettaglio", "id_ordine_dettaglio") + 1;
	 					$scheda["id_ordine_dettaglio"] = $newID;
	 					$scheda["id_ordine"] = $id_ordine;

	 					$sql = "INSERT INTO ordini_dettaglio "
							. " (id_ordine_dettaglio, id_ordine,  id_articolo_base, id_colore, id_colore_2,id_colore_3,   qta,  prezzo,  data_consegna, evaso, nota )" 
							. " VALUES ("
							. $newID 
							. "," .  $id_ordine
 
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
	 			}	
	 			$conn->exec($sql) ;
	 		 $log = $log  . $sql . "  **** ";
	 			array_push($dettagli, $scheda);
	 			
	 			
			}	
			
			$conn->commit();
	}
	else if ($action == "DEL_ORDINE_DETTAGLIO" )
	{
		$id_ordine_dettaglio =  trim($obj["id_ordine_dettaglio"]);
		  
		if ( isOrdineDettaglioCancellabile ($conn, $id_ordine_dettaglio))
		{	
			$sql = "DELETE FROM ordini_dettaglio "  
				. " WHERE id_ordine_dettaglio=".$id_ordine_dettaglio;
	 		$conn->exec($sql) ;
	 	}
		else
		{
			$json_response =  array ('esito' => "NOT_OK"  , 'err_code' => "002"  );
			echo json_encode( $json_response); die();
		}			
	}
	
	else if ($action == "DEL_ORDINE" )
	{
		$id_ordine  =  trim($obj["id_ordine"]);
		if ( isOrdineCancellabile ($conn, $id_ordine))
		{
			$sql = "DELETE FROM ordini  "  
				. " WHERE id_ordine=".$id_ordine;
		 	$conn->exec($sql) ;		  
				
			$sql = "DELETE FROM ordini_dettaglio "  
				. " WHERE id_ordine=".$id_ordine;
			$conn->exec($sql) ;
		}
		else
		{
			$json_response =  array ('esito' => "NOT_OK"  , 'err_code' => "002"  );
			echo json_encode( $json_response); die();
		}
	}
 	
	$json_response =  array ('esito' => "OK"  );
	 
 	if ($action == "MOD_ORDINE" ) 
 	{
 		$testata["id_ordine"] = $id_ordine;
 		$testata["id_provenienza"] = $obj["scheda"]["id_provenienza"];
 		$testata["id_cliente"] = $obj["scheda"]["id_cliente"];
 		$testata["data_ricezione"] = $obj["scheda"]["data_ricezione"];
 
 		$json_response["testata"] = $testata;
 		$json_response["dettagli"] = $dettagli;
 }
 else if ($action == "ORDINE_DETTAGLIO_ADD" ) 
 {
 	$json_response["scheda"] = $scheda;
 	$json_response["id_cliente"] = $scheda["id_cliente"];
 }
		 
	echo json_encode( $json_response); 	
} 
catch (Exception $e) 
{
	try
	{
		if ($conn)  $conn->rollBack();
	}
	catch (Exception $e) {};
 	$json_response    =  array( 			         						         		  	  					         							   					         		
			'esito' => 'NOT_OK',			   		
			'err_code' => "001"  ,	
			'sql'=> $sql				,
		//	'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response); 	
  	
}	
	
?>

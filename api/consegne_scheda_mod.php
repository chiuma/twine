<?php

error_reporting(0);
require_once "./JwtConfig.php";
header('Content-Type: application/json; charset=utf-8');

$sql = "";
 
$conn;
 
 
function DbGetNewProgressivoConsegna ($conn )
{
			
   	$sql = $sql = "SELECT  MAX(progressivo)  FROM  consegne WHERE  YEAR(now()) = YEAR(data_consegna_effettuata) ";
     
		$statement = $conn->prepare($sql);
		$statement->execute();  
		$item_id = $statement->fetchColumn();
		return $item_id;
			
			
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
	$dettaglio =  $obj["scheda"] ; 	
	
	 
	$action = trim($obj["action"]);
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dettagli =  array ();
	$LogSql =  array ();
	if ($action == "HIDE_CONSEGNA" )
	{
		$id_consegna =  trim($obj["id_consegna"]);
		  
		$sql = "UPDATE   consegne  set hide = IF(hide=1, 0, 1) "  
			. " WHERE id_consegna=".$id_consegna;
	 	$conn->exec($sql) ;
		 
						
		$json_response =  array ('esito' => "OK"  );
		
	}
	elseif ($action == "MOD_CONSEGNA" )
	{
		 	$conn->beginTransaction();
		 	$scheda = $obj["scheda"];
		 	
		 	
		 	
		//	echo "colli=".$colli;die();
		 	if ( $scheda["id_consegna"] === -1)
		 	{
		 		 $colli =   $scheda["colli"];
		 		$newID =  DbGetNewId ($conn, "consegne", "id_consegna") + 1;
		 		$newProgressivo =  DbGetNewProgressivoConsegna ($conn ) + 1;
		 		$scheda["id_consegna"] = $newID;
		 		$scheda["progressivo"] =  date("y",strtotime($scheda["data_consegna_effettuata"])) ."/". str_pad($newProgressivo, 4, '0', STR_PAD_LEFT);
		 		$sql = "INSERT INTO consegne ( id_consegna,  id_cliente, colli,  progressivo, data_consegna_effettuata, importo_manuale, importo_trasporto, iva, hide, nota) "
		 		. " VALUES("
		 		. $newID 
		 		. "," . $scheda["id_cliente"]
		 		. "," . $colli
		 			. "," . $newProgressivo
		 		. "," . "'". $scheda["data_consegna_effettuata"] ."'"
		 		. "," . $scheda["importo_manuale"]
		 		. "," . $scheda["importo_trasporto"]
		 		. "," . $scheda["iva"]
		 		. ", false "    
		 		. "," . "'". addslashes($scheda["nota"]) ."'"
		 		.")";
		 	}
		 	else
		 	{
		 		$colli = $scheda["colli"];
		 		
		 		$sql = "UPDATE consegne SET  " 
		 		.  " data_consegna_effettuata  = " . "'" . addslashes ($scheda["data_consegna_effettuata"]) . "'"
		 		. "," . "importo_manuale =" . $scheda["importo_manuale"]
		 		. "," . "importo_trasporto =" . $scheda["importo_trasporto"]
		 		. "," . "iva =" . $scheda["iva"]
		 		. "," . "colli =" . $colli
		 		. "," . " nota  = " . "'" . addslashes ($scheda["nota"]) . "'"
		 		. " WHERE id_consegna =". $scheda["id_consegna"];
		 		
		 	}
		 	$conn->exec($sql) ;
		 	
			foreach ($scheda["consegnaDettaglio"] as $dettaglio) 
			{
				
		  	if (trim($dettaglio["id_consegna_dettaglio"]) != "-1")
		  	{

	 				
		  		if (trim($dettaglio["consegnato"]) ==   "false" ||  $dettaglio["consegnato"] == false   )
		  			$sql = "DELETE FROM  consegne_dettaglio    " 
		  			. " WHERE id_consegna_dettaglio =".trim($dettaglio["id_consegna_dettaglio"]); 
		  		else
		  		{
			  		$sql = "UPDATE ordini_dettaglio set "
		 				." evaso = true "
						. "," . "qta = "  .    $dettaglio["qta"] 
						. "," . "prezzo = "  .    $dettaglio["prezzo"]
		 				. " where id_ordine_dettaglio = " .$dettaglio["id_ordine_dettaglio"]  ;	 				
		 				$conn->exec($sql) ;
		 				 
	 						  			
						$sql = "UPDATE consegne_dettaglio SET  "  
							.  "sconto = "  .    $dettaglio["sconto"]   
							.  ", qta_evasa = "  .    $dettaglio["qta_evasa"]   
							. " WHERE id_consegna_dettaglio =".trim($dettaglio["id_consegna_dettaglio"]);
					}
	 			}
	 			else
	 			{
	 				$sql = "UPDATE ordini_dettaglio set "
	 				." evaso = true "
					. "," . "qta = "  .    $dettaglio["qta"] 
					. "," . "prezzo = "  .    $dettaglio["prezzo"]
	 				. " where id_ordine_dettaglio = " .$dettaglio["id_ordine_dettaglio"]  ;
	 				// echo $sql ;
	 				$conn->exec($sql) ;
	 				
	 					$newID =  DbGetNewId ($conn, "consegne_dettaglio", "id_consegna_dettaglio") + 1;
	 					$dettaglio["id_consegna_dettaglio"] = $newID;
	 					$dettaglio["id_consegna"] = $scheda["id_consegna"];
	 			 	
	 					$sql = "INSERT INTO consegne_dettaglio "
							. " (id_consegna , id_consegna_dettaglio, id_ordine_dettaglio, sconto,  qta_evasa )" 
							. " VALUES ("
							. $scheda["id_consegna"]
							. "," .  $newID 
							. ",  " .    $dettaglio["id_ordine_dettaglio"]  
							. ",  "  .    $dettaglio["sconto"]   
							. ",  "  .    $dettaglio["qta_evasa"]   
						  .")";
	 			}	
	 			$conn->exec($sql) ;
	 		 
	 		 array_push($dettagli, $dettaglio);
	 			
	 			array_push($LogSql, trim($dettaglio["consegnato"]) ==   "false" ||  $dettaglio["consegnato"] == false );
			}	
			
			$conn->commit();
			$scheda["consegnaDettaglio"] = $dettagli;
			$json_response =  array ('esito' => "OK" , 'scheda' => $scheda , 'logSql' => $LogSql);
			 
			
	}
	else if ($action == "DEL_CONSEGNA" )
	{
		$id_consegna =  trim($obj["id_consegna"]);
		  
		$conn->beginTransaction();
		$sql = "DELETE FROM consegne "  
			. " WHERE id_consegna=".$id_consegna;
	 	$conn->exec($sql) ;
			
		$sql = "DELETE FROM consegne_dettaglio "  
			. " WHERE id_consegna=".$id_consegna;
	 	$conn->exec($sql) ;
		$conn->commit();
						
		$json_response =  array ('esito' => "OK"  );
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
		 	'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response); 	
  	
}	
	
?>

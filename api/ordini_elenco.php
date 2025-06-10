<?php
// https://www.cimicapp.com/temp/twine/api/ordini_elenco.php
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
 	
	$data_consegna_dal = trim($obj["data_consegna_dal"]);
	$data_consegna_al = trim($obj["data_consegna_al"]);
			
		
			$json_elenco    = array();	
  		$sql = 
  	" SELECT   ordini.id_ordine, ordini.id_cliente , ordini.id_provenienza,  "
  	. "		DATE_FORMAT(ordini.data_ricezione, '%Y/%m/%d') as data_ricezione_formatted,   "
		. "		  ordini_dettaglio.id_ordine_dettaglio, ordini_dettaglio.id_articolo_base, ordini_dettaglio.qta,  ordini_dettaglio.prezzo,  "
		. " ordini_dettaglio.id_colore_2, colori_2.codice as colore_codice_2, colori_2.descrizione as colore_descrizione_2 , "
		. " ordini_dettaglio.id_colore_3, colori_3.codice as colore_codice_3, colori_3.descrizione as colore_descrizione_3 , "
		. "		ordini_dettaglio.id_colore  , "
		. "		DATE_FORMAT(ordini_dettaglio.data_consegna, '%Y/%m/%d') as data_consegna_formatted,   "
		
		. "		ordini_dettaglio.evaso,  ordini_dettaglio.nota,  "
		. "		consegne_dettaglio.id_consegna_dettaglio ,   "
		. "		articoli_base.id_articolo_base, articoli_base.codice, articoli_base.descrizione,  "
		. "		colori.codice as colore_codice, colori.descrizione as colore_descrizione , "
		. "		clienti.descrizione as cliente_descrizione   "
		
		. "	FROM ordini  "		
		. "	INNER  JOIN ordini_dettaglio "
		. "	ON ordini.id_ordine = ordini_dettaglio.id_ordine  "
				
		. "	INNER  JOIN qr_ordini_data_consegna "
		. "	ON ordini.id_ordine = qr_ordini_data_consegna.id_ordine  " 
		
		. "	INNER  JOIN clienti "
		. "	ON ordini.id_cliente = clienti.id_cliente  "
 
		. "	INNER JOIN articoli_base "
		. "	ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base   "
  
  	. "	INNER JOIN colori  "
		. "	ON colori.id_colore  = ordini_dettaglio.id_colore    "
		
		. "	LEFT JOIN provenienze  "
		. "	ON provenienze.id_provenienza  = ordini.id_provenienza    "
	
		. " LEFT JOIN colori as  colori_2  	ON colori_2.id_colore  = ordini_dettaglio.id_colore_2 "
		. " LEFT JOIN colori as  colori_3  	ON colori_3.id_colore  = ordini_dettaglio.id_colore_3 "
			
		. "	LEFT JOIN consegne_dettaglio  "
		. "	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio    "
		
		. " WHERE   	DATE_FORMAT(qr_ordini_data_consegna.data_consegna_max, '%Y-%m-%d') >= '".$data_consegna_dal ."' ";
		
		if ( $data_consegna_al != "")
		{
			$sql = $sql . " AND DATE_FORMAT(qr_ordini_data_consegna.data_consegna_min, '%Y-%m-%d') <= '".$data_consegna_al ."' ";
		}
		
		/**
		if ( $obj["username"] != "fulladmin")
		{
			  $sql = $sql . " AND consegne_dettaglio.id_consegna_dettaglio IS NULL ";
		}
		**/
		
		
		$sql = $sql 
		. "	ORDER BY ordini.data_ricezione , articoli_base.codice, colori.codice   ";
 
			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
		 
			$json_elenco = array(); 
			 
			$itemOrdine;
			foreach ($result as $row)
			{	//	$date = new DateTime($row["last_update"]);
	 			
	//	echo	$row["consegnato"] . "- ". $row["id_ordine_dettaglio"]."   <br>";
 
					 
	 

			 
					$itemOrdine    =  array( 			
					 					         
		  			'data_ricezione'=>     $row["data_ricezione_formatted"] , 
		  			'data_consegna'=>     $row["data_consegna_formatted"] , 
						'id_ordine'=>     intval ( $row["id_ordine"]) ,
		  			
		  			'id_cliente'=>     intval ( $row["id_cliente"]) ,
		  			'cliente_descrizione'=>     $row["cliente_descrizione"]  , 
 					 
		  			
		  			'colore_codice'=> $row["colore_codice"]    ,		
						'id_colore' =>  intval ( $row["id_colore"])  ,	
						'colore_descrizione' =>  $row["colore_descrizione"] ,
						
						'colore_codice_2'=>  $row["colore_codice_2"] ?  $row["colore_codice_2"]   : ""    ,   		
						'id_colore_2' => $row["id_colore_2"] ? intval ($row["id_colore_2"] ) : -1   ,	
						'colore_descrizione_2' => $row["colore_descrizione_2"] ?  $row["colore_descrizione_2"]   : ""    ,
						
						'colore_codice_3'=>  $row["colore_codice_3"] ?  $row["colore_codice_3"]   : ""    ,   		
						'id_colore_3' => $row["id_colore_3"] ? intval ($row["id_colore_3"] ) : -1   ,	
						'colore_descrizione_3' => $row["colore_descrizione_3"] ?  $row["colore_descrizione_3"]   : ""    ,
						
												
						'articolo_base_descrizione' =>     $row["descrizione"]  ,
						'articolo_base_codice'=> $row["codice"] ,
						
						'id_ordine_dettaglio' =>  intval ( $row["id_ordine_dettaglio"])  ,									 
				 
						 
						'id_articolo_base' => intval ( $row["id_articolo_base"]) ,	 
		  			
		  			'data_consegna'=>     $row["data_consegna_formatted"] , 
		  			'data_ricezione'=>     $row["data_ricezione_formatted"] , 
		  			'evaso'=>    ( $row["evaso"] ==  1 ? true : false), 
		  			'consegnato'=>    ( $row["id_consegna_dettaglio"]   ? true : false), 
		  			'nota' =>     $row["nota"]  ,
		  			'prezzo'=> floatval ($row["prezzo"]) ,
		  			'qta'=> intval ($row["qta"]) , 
		  		 
			  		'id_provenienza' =>  $row["id_provenienza"] ? intval ($row["id_provenienza"] ) : -1 ,		
			  			
		    	 );
		    
		  		 array_push($json_elenco, $itemOrdine);
		  
		 
 
		 		
	 	 
	 			
	 		 
	 
			}	  
 
	  
	 	
	 	$json_response    =  array ('esito' => "OK", 'elenco' =>  $json_elenco , 'sql' => $sql 	 ) ;
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

<?php
// https://www.cimicapp.com/temp/twine/api/consegne_scheda_get.php
// http://127.0.0.1/react/twine/api/consegne_scheda_get.php
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
	
		
		
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$id_consegna =   trim($obj["id_consegna"]); 	 
 	$id_cliente =   trim($obj["id_cliente"]); 	
	  // $id_consegna ="2";
 
	include_once './db_config.php';		
		$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
		$itemConsegna = array( );
		if ( $id_consegna != -1 )
		{
			$sql =  " SELECT  consegne.* " 
			. " , DATE_FORMAT(consegne.data_consegna_effettuata, '%Y/%m/%d') as data_consegna_effettuata_formatted   " 
			. "		, clienti.descrizione as cliente_descrizione , clienti.id_cliente  "
			. "	FROM consegne INNER  JOIN clienti "
			. "	ON consegne.id_cliente = clienti.id_cliente  "
			. " where id_consegna = ".$id_consegna ;
			
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			$id_cliente = -1;
			if ($result)
			{
				$row = $result[0];
				$itemConsegna    =  array( 			
			  			'data_consegna_effettuata'=>     $row["data_consegna_effettuata_formatted"] , 
					  
							'progressivo' => date("y",strtotime($row["data_consegna_effettuata"])) ."/". str_pad($row["progressivo"], 4, '0', STR_PAD_LEFT),
							'nota'=>     $row["nota"] , 
							'importo_trasporto' =>    floatval( $row["importo_trasporto"]) , 
							'importo_manuale' =>    floatval( $row["importo_manuale"]) , 
							'iva' =>    floatval( $row["iva"]) , 
			  			'id_consegna'=>     intval ( $row["id_consegna"]) ,
			  			'id_cliente'=>     intval ( $row["id_cliente"]) ,
			  			'colli'=>     intval ( $row["colli"]) ,
			  			'cliente_descrizione'=>     $row["cliente_descrizione"] , 
	 					   
			    	 );
			  $id_cliente = intval ( $row["id_cliente"]) ;
			}
			else
			{
					$itemConsegna    =  array( 			
			  			'data_consegna_effettuata'=>     "" , 
							'codice'=>     "" , 
							'progressivo' => "",
							'nota'=>     "" , 
			  			'id_consegna'=>     -1 ,
			  			'id_cliente'=>    -1 ,
			  			'cliente_descrizione'=>     -1 , 
			  			'importo_manuale'=>    0 , 
			  			'importo_trasporto'=>    0 , 
			  			'iva'=>    0 , 
	 					   
			    	 );
			}
		}
		
		
  		$sql = 
  	" SELECT  consegne.*, articoli_base.codice as articolo_base_codice "
  	. " , ordini_dettaglio.id_ordine "
  	. " , ordini_dettaglio.id_colore_2, colori_2.codice as colore_codice_2, colori_2.descrizione as colore_descrizione_2  "
  	. " , ordini_dettaglio.id_colore_3, colori_3.codice as colore_codice_3, colori_3.descrizione as colore_descrizione_3  "
  	. " , DATE_FORMAT(ordini_dettaglio.data_consegna, '%Y/%m/%d') as data_consegna_formatted   " 
		. "		,consegne_dettaglio.id_consegna_dettaglio  , consegne_dettaglio.qta_evasa , consegne_dettaglio.sconto   "
		. "		,ordini_dettaglio.id_ordine_dettaglio , ordini_dettaglio.qta , ordini_dettaglio.prezzo as prezzo, consegne_dettaglio.sconto   "
		. "		,articoli_base.id_articolo_base , articoli_base.descrizione as articolo_descrizione    "
		. "		, colori.codice as colore_codice, colori.descrizione as colore_descrizione   "
		. "	FROM consegne  " 
		
		. "	INNER  JOIN consegne_dettaglio ON consegne.id_consegna = consegne_dettaglio.id_consegna  "
		
		. "	RIGHT  JOIN ordini_dettaglio ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio   "
		
		. "	RIGHT  JOIN ordini  ON ordini_dettaglio.id_ordine   = ordini.id_ordine "
		
		. "	INNER JOIN articoli_base ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base   "
  
  	. "	INNER JOIN colori ON colori.id_colore  = ordini_dettaglio.id_colore    "
		
	  . " LEFT JOIN colori as  colori_2  	ON colori_2.id_colore  = ordini_dettaglio.id_colore_2 " 
		. " LEFT JOIN colori as  colori_3  	ON colori_3.id_colore  = ordini_dettaglio.id_colore_3 ";
		
		
		if ($id_consegna == "-1")
			$WHEREParms =	" consegne.id_consegna  IS NULL and ordini.id_cliente = ". $id_cliente ;
		else
				$WHEREParms = " (consegne.id_consegna = " .$id_consegna . " OR (consegne.id_consegna  IS NULL and ordini.id_cliente = ". $id_cliente . ")) ";
		
		
		$sql = $sql  
		. " WHERE ".$WHEREParms  
		. "	ORDER BY  consegne.id_consegna desc, consegne_dettaglio.id_consegna_dettaglio ,  ordini_dettaglio.data_consegna  ";
	
	
// echo $sql;die();
	
 
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			$prec_id_consegna = "-1";
		 
			$arrDettaglio  = array() ;
			$itemConsegna;
 
			foreach ($result as $row)
			{	//	$date = new DateTime($row["last_update"]);
			//	echo "<br>prec_id_consegna=$prec_id_consegna  - id_consegna=".$row["id_consegna"]."<br>";
 
		 
					
		    
		     	$itemDettaglio    =  array( 			
		     		'data_consegna'=>     $row["data_consegna_formatted"] , 
						'id_consegna_dettaglio' =>  ($row["id_consegna_dettaglio"] ? intval ( $row["id_consegna_dettaglio"]) : -1)  ,		 
						'id_ordine_dettaglio' =>  intval ( $row["id_ordine_dettaglio"])  ,		
						'id_ordine' =>  intval ( $row["id_ordine"])  ,		
						'id_consegna' =>  ($row["id_consegna"] ? intval ( $row["id_consegna"]) : -1)  ,		 
						'id_articolo_base' =>  intval ( $row["id_articolo_base"])  ,
						'qta' =>  intval ( $row["qta"])  ,
						'sconto' =>  intval ( $row["sconto"])  ,
						'qta_evasa' =>  intval ( $row["qta_evasa"])  ,
						'prezzo' =>  floatval ( $row["prezzo"])  ,
						'articolo_descrizione'=>     $row["articolo_descrizione"] , 
						'colore_descrizione' =>  $row["colore_descrizione"] ,
						'colore_codice'=> $row["colore_codice"]   ,
						'colore_codice_2'=>  $row["colore_codice_2"] ?  $row["colore_codice_2"]   : ""    ,    
						'colore_descrizione_2' => $row["colore_descrizione_2"] ?  $row["colore_descrizione_2"]   : ""    ,
						
						'colore_codice_3'=>  $row["colore_codice_3"] ?  $row["colore_codice_3"]   : ""    ,    
						'colore_descrizione_3' => $row["colore_descrizione_3"] ?  $row["colore_descrizione_3"]   : ""    ,
																		
						'articolo_base_codice'=> $row["articolo_base_codice"] , 
						
		    	 );
	    
	    		array_push($arrDettaglio, $itemDettaglio);  
		    
		 
		    	 
		 		}
		 $itemConsegna ["consegnaDettaglio"] = $arrDettaglio;
		 	    
		 	  
	 	
	 	$json_response    =  array ('esito' => "OK", 'scheda' =>  $itemConsegna    ) ;
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
	
	
	/****
	 SELECT  
 
 DATE_FORMAT(consegne.data_consegna_effettuata,'%Y/%m/%d') as data_consegna_effettuata_formatted   		,
 consegne.id_consegna, consegne.codice, consegne.id_cliente, 
 consegne.data_consegna_effettuata,
 clienti.descrizione as cliente_descrizione   		,
SUM(consegne_dettaglio.qta_evasa) as qtaEvasa, SUM(ordini_dettaglio.qta ) as qta , SUM(ordini_dettaglio.qta*ordini_dettaglio.prezzo ) as importo   
 
 
 
 FROM consegne  	
 INNER  JOIN clienti 	ON consegne.id_cliente = clienti.id_cliente  	
 INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna  	
 INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio   
 	GROUP BY 
  	
  	 consegne.id_consegna, consegne.codice, consegne.id_cliente, 
 consegne.data_consegna_effettuata
 
 
 
 
 **/
?>



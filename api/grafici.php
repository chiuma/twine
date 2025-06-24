<?php

 error_reporting(0);
 
 require_once "./JwtConfig.php";
 require_once "./cors.php"; 
 header('Content-Type: application/json; charset=utf-8');

$sql = "";

//  

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
	$filtri =  $obj["filtri"] ; 
	$id_cliente = trim($filtri["id_cliente"]);
	$data_consegna_effettuata_al = trim($filtri["data_consegna_effettuata_al"]);
	$data_consegna_effettuata_dal = trim($filtri["data_consegna_effettuata_dal"]);
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	
	
	$where_filtri = " WHERE 1 = 1 ";
	if ( $data_consegna_effettuata_dal != "")
	{
		$where_filtri = $where_filtri . " AND	DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') >= '".$data_consegna_effettuata_dal ."' ";
	}
	
	if ( $data_consegna_effettuata_al != "")
	{
		$where_filtri = $where_filtri .		 " AND DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') <= '".$data_consegna_effettuata_al ."' ";
 	}

	if ( $id_cliente != "" && $id_cliente != "-1" )
	{
		$where_filtri = $where_filtri .	" AND	consegne.id_cliente = " .$id_cliente;
 	}
 		
	// **********************	
	$json_consegne_articoli    = array();	
	$sql = " SELECT      articoli_base.codice, articoli_base.id_articolo_base , "
			. " ROUND(SUM(ordini_dettaglio.prezzo*qta - (consegne_dettaglio.sconto*ordini_dettaglio.prezzo*qta/100)),2) as importo_totale "
			. " FROM consegne   "
			. " INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna"
			. " INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio"
			. " INNER JOIN articoli_base	ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base "
			. $where_filtri
			. " GROUP BY  articoli_base.id_articolo_base ,   articoli_base.codice " 
			. " ORDER BY importo_totale desc";
 
	$sth = $conn->prepare($sql);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);		 
	$json_consegne_articoli = array(); 

 	$riga =0;
	$item;
	 
	foreach ($result as $row)
	{						 
	 
			$item    =  array( 		
				'id_articolo_base' =>  $row["id_articolo_base"],
				'codice' =>  $row["codice"] , 
  			'importo_totale' =>  floatval ( $row["importo_totale"])  ,
  	 
    	 );

 			array_push($json_consegne_articoli, $item); 
 			
 			$riga++;
 			if ($riga > 280)
 			 break;

	}	  
			
	
	// **********************
	$json_consegne_cliente    = array();	
	$sql = " SELECT    clienti.id_cliente, clienti.descrizione, "
			. " ROUND(SUM(ordini_dettaglio.prezzo*qta - (consegne_dettaglio.sconto*ordini_dettaglio.prezzo*qta/100)),2) as importo_totale "
			. " FROM consegne   "
			. " INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna"
			. " INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio"
			. " INNER  JOIN clienti	ON consegne.id_cliente = clienti.id_cliente "
			. $where_filtri
			. " GROUP BY   clienti.descrizione, clienti.id_cliente"
			. " ORDER BY importo_totale desc";
 
	$sth = $conn->prepare($sql);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);		 
	$json_consegne_cliente = array(); 

 	$riga =0;
	$item;
	 
	foreach ($result as $row)
	{						 
	 
			$item    =  array( 			 
  			'id_cliente'=>     $row["id_cliente"] , 
  			
				'cliente'=>  $row["descrizione"] , 
  			'importo_totale' =>  floatval ( $row["importo_totale"])  ,
  	 
    	 );

 			array_push($json_consegne_cliente, $item); 
 			
 			$riga++;
 			if ($riga > 280)
 			 break;

	}	  
			
			
				
	// **********************
	$json_elenco    = array();	
	$sql = 
  " SELECT "
	. "	SUM(ordini_dettaglio.qta * ordini_dettaglio.prezzo - (ordini_dettaglio.qta * ordini_dettaglio.prezzo * consegne_dettaglio.sconto /100)) as importo_totale,  "
	. "	DATE_FORMAT(consegne.data_consegna_effettuata,'%Y/%m') as anno_mese   "
	. "	FROM consegne "
	. "	INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna "
	. "	INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio "
	. $where_filtri	
	. "	GROUP BY anno_mese"
	. "	ORDER BY anno_mese";
	
 
 

	
	$sth = $conn->prepare($sql);
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);		 
	$json_elenco_consegne_annomese = array(); 

 
	$itemConsegna;
	foreach ($result as $row)
	{	//	$date = new DateTime($row["last_update"]);
	//	echo "<br>  - id_consegna=".$row["id_consegna"]."<br>";

			 
	 
			$itemConsegna    =  array( 			
  			'anno_mese'=>     $row["anno_mese"] , 

  			'importo_totale' =>  floatval ( $row["importo_totale"])  ,
  	 
    	 );

 			array_push($json_elenco_consegne_annomese, $itemConsegna); 

	}	  
 
 	 
	 

	// **********************



	 	
	 	
	 	$json_response    =  array ('esito' => "OK", 
	 								'elenco_consegne_annomese' =>  $json_elenco_consegne_annomese , 
  	 								'elenco_consegne_cliente' => $json_consegne_cliente,
	 								'elenco_consegne_articoli' => $json_consegne_articoli ) ;
	 								
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
	 
	 
	 
	 /******
	  SELECT      articoli_base.codice, articoli_base.id_articolo_base ,  articoli_base.descrizione,
 SUM(ordini_dettaglio.prezzo*qta) as qta
 ROUND(SUM(ordini_dettaglio.prezzo*qta - 
 (consegne_dettaglio.sconto*ordini_dettaglio.prezzo*qta/100)),2) as importo_totale  
 FROM consegne    
 INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna 
 INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio 
 INNER JOIN articoli_base	ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base  
 WHERE 1 = 1  
 AND	DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') >= '2022-01-01' 
 GROUP BY articoli_base.descrizione, articoli_base.id_articolo_base ,   articoli_base.codice  
 ORDER BY importo_totale desc
 
 ------------------
  SELECT    clienti.id_cliente, clienti.descrizione,  
 ROUND(SUM(ordini_dettaglio.prezzo*qta - 
 (consegne_dettaglio.sconto*ordini_dettaglio.prezzo*qta/100)),2) as importo_totale  
 FROM consegne    
 INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna 
 INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio 
 INNER  JOIN clienti	ON consegne.id_cliente = clienti.id_cliente  
 WHERE 1 = 1 
  AND	DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') >= '2022-01-01' 
  GROUP BY   clienti.descrizione, clienti.id_cliente ORDER BY importo_totale desc
	 
	 
	 ****/
?>



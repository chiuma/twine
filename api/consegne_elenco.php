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
			echo json_encode( $authCheck); 	
			die();
		}
 
	
	include_once './db_config.php';		
	
	$json = file_get_contents('php://input'); 	
	$obj = json_decode($json, TRUE);
	$id_cliente =  $obj["id_cliente"] ; 	
	$data_consegna_effettuata_dal =  $obj["data_consegna_effettuata_dal"] ; 	
	$data_consegna_effettuata_al =  $obj["data_consegna_effettuata_al"] ; 	
 
 	if ( $obj["username"] != "fulladmin")
 	{
 		$dNow  = new DateTime(); 
		$dNow ->modify('-1 month');  
		$data_consegna_effettuata_dal =  $dNow->format("Y-m-d");
 		$show_all =   true ;
 	}	
	
	
	$json_elenco    = array();	
	$sql = 
  " SELECT  " 
 . " DATE_FORMAT(consegne.data_consegna_effettuata,'%Y/%m/%d') as data_consegna_effettuata_formatted   		, "
 . " consegne.hide, consegne.id_consegna, consegne.colli, consegne.progressivo, consegne.id_cliente, consegne.progressivo, consegne.importo_manuale, consegne.importo_trasporto, consegne.iva, "
 . " consegne.data_consegna_effettuata, consegne.nota, "
 . " clienti.descrizione as cliente_descrizione, "
 . " SUM(consegne_dettaglio.qta_evasa) as qtaEvasa, SUM(ordini_dettaglio.qta ) as qta , "   
 . " SUM((ordini_dettaglio.qta*ordini_dettaglio.prezzo) - (ordini_dettaglio.qta*ordini_dettaglio.prezzo*consegne_dettaglio.sconto/100) ) as importo_scontato  ,  "  
 . " SUM((ordini_dettaglio.qta*ordini_dettaglio.prezzo)   ) as importo    "  
 . " FROM consegne  	 "
 . " INNER  JOIN clienti 	ON consegne.id_cliente = clienti.id_cliente  	 "
 . " INNER  JOIN consegne_dettaglio 	ON consegne.id_consegna = consegne_dettaglio.id_consegna  	 "
 . " INNER  JOIN ordini_dettaglio 	ON consegne_dettaglio.id_ordine_dettaglio  = ordini_dettaglio.id_ordine_dettaglio    ";
 	
 	if ($id_cliente)
 	{
 		$sql = $sql . " WHERE consegne.id_cliente = " .$id_cliente;
 		if ( $obj["username"] != "fulladmin")
 		{
 			$sql = $sql . " AND  hide = 0 ";
 			$sql = $sql . " AND   	DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') >= '".$data_consegna_effettuata_dal ."' ";

 		}
 	}
 	else
 	{
 		$sql = $sql . " WHERE   	DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') >= '".$data_consegna_effettuata_dal ."' ";
 		
 		if ( $data_consegna_effettuata_al != "")
 		{
 			
			$sql = $sql . " AND DATE_FORMAT(consegne.data_consegna_effettuata, '%Y-%m-%d') <= '".$data_consegna_effettuata_al ."' ";
		}
		
 		if ( $obj["username"] != "fulladmin")
 		{
 			$sql = $sql . " AND  hide = 0 "; 
 		}
 	}
 	
 	$sql = $sql . " GROUP BY clienti.descrizione, consegne.nota, consegne.id_consegna, consegne.progressivo, consegne.progressivo, consegne.id_cliente,  consegne.data_consegna_effettuata";
	
			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			$prec_id_consegna = "-1";
			$json_elenco = array(); 
			$arrDettaglio  ;
			$itemConsegna;
			foreach ($result as $row)
			{	//	$date = new DateTime($row["last_update"]);
			//	echo "<br>prec_id_consegna=$prec_id_consegna  - id_consegna=".$row["id_consegna"]."<br>";
 
					$arrDettaglio  = array();
			 
					$itemConsegna    =  array( 			
		  			'data_consegna_effettuata'=>     $row["data_consegna_effettuata_formatted"] , 
						'progressivo' => date("y",strtotime($row["data_consegna_effettuata"])) ."/". str_pad($row["progressivo"], 4, '0', STR_PAD_LEFT),
						'importo_trasporto'=>     $row["importo_trasporto"] , 
						'importo_manuale'=>   floatval (  $row["importo_manuale"] ), 
						
						'nota'=>     $row["nota"] , 
		  			'id_consegna'=>     intval ( $row["id_consegna"]) ,
		  			'id_cliente'=>     intval ( $row["id_cliente"]) ,
		  			
		  			'hide'=>      intval (   $row["hide"] ) ,
		  			'cliente_descrizione'=>     $row["cliente_descrizione"] , 
		  			'qta_evasa'=>     intval ( $row["qtaEvasa"]) ,
		  			'qta'=>     intval ( $row["qta"]) , 
		  			'importo' =>  floatval ( $row["importo"])  ,
		  			'importo_scontato' =>  floatval ( $row["importo_scontato"])  ,
		  			'iva' =>  floatval ( $row["iva"])  ,
		  			'colli'=>     intval ( $row["colli"]) ,
		    	 );
 
		 			array_push($json_elenco, $itemConsegna);
		 			   
  
	 	 
	 			
	 		 
	 
			}	  
 
	  
	 	
	 	$json_response    =  array ('esito' => "OK", 'elenco' =>  $json_elenco  , 'tmp' => $sql ) ;
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
  	 clienti.descrizione,
  	 consegne.id_consegna, consegne.codice, consegne.id_cliente, 
 consegne.data_consegna_effettuata
 
 
 
 
 **/
?>



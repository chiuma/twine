<?php

 error_reporting(0);
 header('Content-Type: application/json; charset=utf-8');

$sql = "";



try
{
	include_once './db_config.php';		
			$json_elenco    = array();	
  		$sql = " SELECT qrcode.id_qrcode, qrcode.id_articolo_base , qrcode.id_colore, qrcode.id_colore_2, qrcode.id_colore_3, qrcode.code, "
				. "	articoli_base.codice as cod_articolo, "
				. "	colori.codice as cod_colore , "
				. "	colori_2.codice as cod_colore_2 , "
				. "	colori_3.codice as cod_colore_3  "
				. "	FROM qrcode "
				. "	INNER  JOIN articoli_base ON articoli_base.id_articolo_base = qrcode.id_articolo_base "
				. "	INNER JOIN colori   	ON colori.id_colore  = qrcode.id_colore  "
				. "	LEFT JOIN colori as  colori_2  	ON colori_2.id_colore  = qrcode.id_colore_2 "
				. "	LEFT JOIN colori as  colori_3  	ON colori_3.id_colore  = qrcode.id_colore_3 "
				. " ORDER BY articoli_base.codice "; 
	
			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		 
			  $json_elenco = array(); 
			$arrArt  ;
			$item;
			foreach ($result as $row)
			{
					 
		 
					 
					$item    =  array( 		
						'id_qrcode' => intval ( $row["id_qrcode"]) ,		
						'id_articolo_base' => intval ( $row["id_articolo_base"]) ,	
						'id_colore' => intval ( $row["id_colore"]) ,
						'id_colore' => intval ( $row["id_colore"]) ,
						'id_colore_2' => intval ( $row["id_colore_2"]) ,
						'id_colore_3' => intval ( $row["id_colore_3"]) ,				         
		  			'code'=>  (  $row["code"]), 
		  			'cod_articolo'=>  (  $row["cod_articolo"]), 
		  			'cod_colore'=>   ($row["cod_colore"]),  
		  			'cod_colore_2'=>   ($row["cod_colore_2"]), 
		  			'cod_colore_3'=>   ($row["cod_colore_3"]), 
		  		 
		    	 );
		    
		    	 array_push($json_elenco, $item);
		  
		 
		  
		 		
	 	 
	 			
	 		 
	 
			}	  
 
	 	$json_response    =  array ('esito' => "OK", 'elenco' =>  $json_elenco   ) ;
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

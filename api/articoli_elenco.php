<?php

 error_reporting(0);
 require_once "./cors.php"; 
 header('Content-Type: application/json; charset=utf-8');

$sql = "";



try
{
	include_once './db_config.php';		
			$json_elenco    = array();	
  		$sql = " SELECT articoli_base.*   "
 						. " FROM articoli_base "
 
						. " ORDER BY articoli_base.codice "; 
	
			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			$prec_id_articolo_base = "-1";
			  $json_elenco = array(); 
			$arrArt  ;
			$item;
			foreach ($result as $row)
			{	//	$date = new DateTime($row["last_update"]);
			//	echo "<br>prec_id_articolo_base=$prec_id_articolo_base  - id_articolo_base=".$row["id_articolo_base"]."<br>";
 
					 
		 
					 
					$item    =  array( 			
						'id_articolo_base' => intval ( $row["id_articolo_base"]) ,					         
		  			'descrizione'=>  (  $row["descrizione"]), 
		  			'codice'=>   ($row["codice"]),  
		  			'prezzo'=>   floatval($row["prezzo"]) 
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

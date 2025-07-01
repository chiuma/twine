<?php
// https://www.cimicapp.com/temp/twine/api/clienti_elenco.php
error_reporting(1);
require_once "./cors.php"; 

 


$sql ="";
try
{
	include_once './db_config.php';		
//	$_POST['descrizione'] = chr(0xbf) .chr(0x27) . " OR id_cliente > 1 -- ";
 
 
 
 

$json_elenco    = array();	
  		$sql = "SELECT clienti.*    " .
						" FROM clienti   " .
						" ORDER BY  clienti.descrizione "; 
	 
			$conn  = new PDO ('mysql:host='.HOST.';  dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);   
			//print_r ($sth);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			
			foreach ($result as $row)
			{	//	$date = new DateTime($row["last_update"]);
				
			 
				$item    =  array( 			
					'id_cliente' => intval ( $row["id_cliente"]) ,					         
	  			'descrizione'=>  (  $row["descrizione"]), 
	  			'piva'=>   ($row["piva"]), 
	    		'telefono'=>   ($row["telefono"]), 
					'cellulare'=>   ($row["cellulare"]), 
	    		'codfiscale'=>   ($row["codfiscale"]), 
	    		'email'=>   ($row["email"]), 
	    		'cap'=>   ($row["cap"]), 
	    		'comune'=>   ($row["comune"]), 
	    		'provincia'=>   ($row["provincia"]), 
	    		'indirizzo'=>   ($row["indirizzo"]),  
					'indirizzo_legale'=>   ($row["indirizzo_legale"]), 	    		
	    	 );
		 
	 			array_push($json_elenco, $item);
	 			
	 		 
	 
			}	  	
 			 
	  
	 	
	 	$json_response    =  array ('esito' => "OK",   'elenco' =>  $json_elenco    ) ;
	 
	 	 echo json_encode( $json_response); 	
} 
catch (Exception $e) 
{

 	$json_response    =  array( 			         						         		  	  					         							   					         		
			'esito' => 'NOT_OK',			   		
			'err_code' => "001"  ,	 
			'msg' => $e->getMessage(),	
	 		);	
	 
  echo json_encode( $json_response); 	
  	
}	
	
?>

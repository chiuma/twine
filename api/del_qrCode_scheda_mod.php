<?php

error_reporting(0);
require_once "./cors.php"; 
require_once "./JwtConfig.php";
header('Content-Type: application/json; charset=utf-8');

 

function isCodeEsiste($conn, $code, $id_qrcode)
{
 	$sql = 	" SELECT count(*)    " .
	" FROM   qrcode " . 
 	" WHERE qrcode.code = '" .addslashes($code) ."' ". 
	" AND qrcode.id_qrcode != ".$id_qrcode;
		 
	$statement = $conn->prepare($sql);
	$statement->execute();  
	$conteggio = $statement->fetchColumn();
 
	if ( $conteggio > 0 )
		return true; 		
 
	else
		return false;
}

 


 

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
	$scheda =  $obj["scheda"] ; 	
	$action = trim($obj["action"]);
 	$id_qrcode = $scheda["id_qrcode"];
	
	$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if ($action == "DEL_QRCODE" )
	{

		$id_qrcode =  trim($obj["id_qrcode"]);
 
 
		$sql = "DELETE FROM qrcode "
			. " WHERE id_qrcode = " .$id_qrcode;
			
	}
	  
	else if ($id_qrcode ===  -1 )
	{ 
		
		if ( isCodeEsiste($conn, $scheda["code"]  , $id_qrcode  ))
		{ 
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "004"  	 );
			echo json_encode( $json_response);die();
		}
		
		$new_id = DbGetNewId ($conn, "qrcode", "id_qrcode") + 1;
	
						
		$sql = "INSERT INTO qrcode ( id_qrcode, code, id_articolo_base, id_colore, id_colore_2, id_colore_3) "
			. " VALUES ("						
			. $new_id. ","
			. "'" . addslashes ($scheda["code"]) . "'" 
			. ",  " .    $scheda["id_articolo_base"] 
			. ",  " .    $scheda["id_colore"] 
			. ",  " .  ($scheda["id_colore_2"] != "-1" && $scheda["id_colore_2"] != "" ?  $scheda["id_colore_2"]   :  " null " )  
			. ",  " .  ( $scheda["id_colore_3"] != "-1" && $scheda["id_colore_3"] != ""  ?  $scheda["id_colore_3"]   :  " null "  )  
			. ")";
	}
	else
	{ 
		 
		if ( isCodeEsiste($conn,  $scheda["code"]  , $id_qrcode ))
		{ 
			$json_response =  array ('esito' => "NOT_OK" ,'err_code' => "004"  	 );
			echo json_encode( $json_response);die();
		}
	 
		$sql = "UPDATE qrcode SET  " 
			. " code = " . "'" . addslashes ( $scheda["code"] ) . "'" 
			. ",   	id_articolo_base  = " .    $scheda["id_articolo_base"] 
			. ",  	id_colore  = " .    $scheda["id_colore"] 
			. ",  	id_colore_2  = " .   ($scheda["id_colore_2"] != "-1" && $scheda["id_colore_2"] != "" ?  $scheda["id_colore_2"]   :  " null "  ) 
			. ",  	id_colore_3  = " .  ( $scheda["id_colore_3"] != "-1" && $scheda["id_colore_3"] != "" ?  $scheda["id_colore_3"]   :  " null "  )
			. " WHERE id_qrcode=". $scheda["id_qrcode"];
	}
// echo $sql;
  $conn->exec($sql) ;
	$json_response =  array ('esito' => "OK"  );
	 
	if ($id_qrcode ===  -1   ) $json_response["new_id"] = $new_id;
 
 
		 
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

<?php
// https://www.cimicapp.com/temp/twine/api/clienti_etichetta_stampa.php?elenco_consegne=171,172
// error_reporting(0);
require_once "./JwtConfig.php";
	$authCheck = JwtConfig::checkToken();
	if (  $authCheck["esito"] === "NOT_OK")
	{
	  //	echo json_encode( $authCheck);  	die();
	}
	
	$id_cliente = $_GET["id_cliente"];
	$num_colli = $_GET["colli"];
	$elenco_consegne = $_GET["elenco_consegne"];
	
 
	
			
?>
<!DOCTYPE html>
<html>
  <head>
  	<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'>
 

    <style>
@page {
  size: A4;
  margin: 10;
}
@media print {
  html, body {
    width: 210mm;
    height: 297mm;
  }
 
}
   
    body {

        /* to centre page on screen*/
        margin-left: auto;
        margin-right: auto;
        
    }
    
 
    
    
    </style>
  </head>

  <body onLoad="    window.print() " >
  	

<?php
 
  
 

$sql = "";



try
{
	include_once './db_config.php';	
 
if ( $elenco_consegne == "")
{			
			if ( 	$num_colli == "0" )
			{
				echo "Num colli ".$num_colli."<br>"; die();
			}  
			else if ( 	$id_cliente == "0" )
			{
				echo "Parametri errati<br>"; die();
			}  
			
			$where = " WHERE clienti.id_cliente = " . $id_cliente;
						
  		$sql = "SELECT    clienti.* "
				. " FROM clienti " 
				. $where 
				. " ORDER BY  clienti.descrizione   ";
}
else
{
	  	$sql = "SELECT    clienti.*, consegne.colli as num_colli "
 				. " FROM consegne  	 "
 				. " INNER  JOIN clienti 	ON consegne.id_cliente = clienti.id_cliente  	 "
 				. " WHERE consegne.id_consegna IN (". $elenco_consegne . ") "
				. " ORDER BY  clienti.descrizione   ";
}
  	 
  		 
     //  echo $sql; die();

			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
 
		 //echo $sql."<br>";
	 
			$numRiga = -1;
			
			foreach ($result as $row)
			{ 			
 			 
 			 if ( $elenco_consegne != "")
 					$num_colli = $row["num_colli"] ;
		 	
		 		if ( $num_colli == 0)
		 		{
		 			echo "<div  style='color:red;margin:4px;font-size:120%'>ATTENZIONE: " . $row["descrizione"]. " - Num colli ".$num_colli."</div>";
		 		}
		 		
			 for ($i=0; $i < $num_colli; $i++)
			 {
			 	$numRiga++;
			 	
			 	$fontDescrizione = "";
			 	 if ( strlen($row["descrizione"]) > 43 )
			 	 $fontDescrizione = " font-size:80%; ";
			 	else if ( strlen($row["descrizione"]) > 35 )
			 	 $fontDescrizione = " font-size:90%; ";
			 	 
			 	$fontIndirizzo = "";
			 	 if ( strlen($row["indirizzo"]) > 43 )
			 	 $fontIndirizzo = " font-size:80%; ";
			 	else if ( strlen($row["indirizzo"]) > 35 )
			 	 $fontIndirizzo = " font-size:90%; ";
?>
<div style="font-family: 'Roboto';font-size: 38px; display: flex; flex-direction:column ;
	 justify-content: center; align-items: center; height:145mm;
	 page-break-after: <?php echo ($numRiga%2 == 1 ? "always" : "auto" )?> ;">
			
			
				<div style="<?php echo $fontDescrizione ?> margin-bottom:20px; align:center">
					<?php echo ($row["descrizione"]) ?>
				</div>

				<div style="<?php echo $fontIndirizzo ?> margin-bottom:20px;">
					<?php echo ($row["indirizzo"]) ?> 
				</div>
				
				<div style="margin-bottom:20px;">
					<?php echo ($row["comune"]) ?> 
				</div>
				
				<div>	
					<?php echo ($row["cap"]) ?> - <?php echo ($row["provincia"]) ?>
				</div>
				
			 
</div>
 
<?php			
			 } 
			}   

?>
  
		
			  </body>
</html>
<?php
	 
} 
catch (Exception $e) 
{

 echo  ("errore ".$e->getMessage()  ); 	
  	
}	
	
?>

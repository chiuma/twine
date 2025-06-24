<?php
// https://www.cimicapp.com/temp/twine/api/clienti_etichetta_stampa.php?elenco_consegne=171,172
error_reporting(0);
require_once "./cors.php"; 
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
  margin: 8;
}
@media print {
  html, body {
    width: 210mm;
    height: 297mm;
  }
 
}
   html, body {  box-sizing: border-box;}
    body {
font-family: 'Roboto';font-size: 32px; 
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
			 	$cssBreak = "";
			 if ($numRiga%2 == 1)
			 {
 					$cssBreak = "break-after: always; page-break-after:always;";
			 }

?>
<div style="height:145mm; <?php echo ($cssBreak) ?>  
	 
	display: flex; flex-direction:column ; justify-content:center ; align-items:center ; ">
			
	<div style="width:90%;
	display: flex; flex-direction:row ; justify-content:space-between ; align-items: center; 
	padding:5px; border-style: solid;border-color: black;
	">
				<div style="">
					Mitt.  
				</div>
				
				<div style="">
					Twine srl
				</div>
				
				<div style="">
					Spago di terra
				</div> 
	</div>	
	
	<div style="width:90%;
	display: flex; flex-direction:column ; justify-content:center ; align-items: left; 
	padding:5px; border-style: solid;border-color: black;
	">
	<div style="margin-bottom:5px; font-size:80% ">
		Dest.
	</div>
				<div style="margin-bottom:7px;  ">
					<?php echo ($row["descrizione"]) ?>
				</div>

				<div style="margin-bottom:7px;">
					<?php echo ($row["indirizzo"]) ?> 
				</div>
				
				<div style="margin-bottom:7px;">
					<?php echo ($row["cap"]) ?> 
				</div>
				
				<div>	
					<?php echo ($row["comune"]) ?> - <?php echo ($row["provincia"]) ?>
				</div>
 	
		</div>
			 
		<div style="width:90%; <?php echo ( $cssBreak) ?> ; 
			display: flex; flex-direction:column ; justify-content:center ; align-items: center; 
			padding:5px; border-style: solid;border-color: black;
			">
			ATTENZIONE FRAGILE
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

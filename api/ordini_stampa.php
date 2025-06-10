<?php
// https://www.cimicapp.com/temp/twine/api/ordini_stampa.php
error_reporting(0);
require_once "./JwtConfig.php";
	$authCheck = JwtConfig::checkToken();
	if (  $authCheck["esito"] === "NOT_OK")
	{
	 	echo json_encode( $authCheck);  	die();
	}
	
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



      table, th, td {
  border: 1px solid black;
		}
		
		   table { page-break-inside:auto }
   tr    { page-break-inside:avoid; page-break-after:auto }
   
   
   
    body {

        /* to centre page on screen*/
        margin-left: auto;
        margin-right: auto;
        font-family: 'Roboto';font-size: 18px;
    }
    
     .center {
			  margin-left: auto;
			  margin-right: auto;
			}

    .testata
    {
    	font-weight:bold;white-space: nowrap
    }
    
    .tabella
    {
			margin-bottom: 3%;
			width:90%;
    }
    
    .cell_data_richiesta
    {
    	width: 10%;
    	text-align: center
    }
    
    .cell_cliente
    {
    	width: 50%
    }
    
     .cell_importo
    {
    	width: 10%
    }
        
    .cell_qta
    {
    	width: 10%;
    	text-align:center
    }
    
    .cell_provenienza
    {
    	width: 20%,
    	
    }
    
    
    </style>
  </head>

  <body onload=" window.print()  ">
  	

<?php
 
  
 

$sql = "";



try
{
	include_once './db_config.php';		
			$json_elenco    = array();	
			$importo_totale = 0;
			
			$where = " WHERE 1=1 ";
			// id_cliente=1&id_articolo_base=-1&id_provenienza=-1&data_consegna_al=&data_consegna_dal=&data_ricezione_al=&data_ricezione_dal=&evaso=No&consegnato=No
			if ($_GET["id_cliente"] != "-1")
			{
				$where = $where. " AND ordini.id_cliente = " . $_GET["id_cliente"];
			}
			
			if ($_GET["data_ricezione_dal"] != "")
			{
				$where = $where. " AND 	DATE_FORMAT(ordini.data_ricezione, '%Y-%m-%d')   >= '" . $_GET["data_ricezione_dal"] . "' ";
			}
			
			if ($_GET["data_ricezione_al"] != "")
			{
				$where = $where. " AND 	DATE_FORMAT(ordini.data_ricezione, '%Y-%m-%d')   <= '" . $_GET["data_ricezione_al"] . "' ";
			}
			
			
			
			if ($_GET["iniziali_cliente"] != "")
			{
				$where = $where. " AND 	clienti.descrizione like '" . $_GET["iniziali_cliente"] . "%' ";
			}
		
		
 
			
			
			if ($_GET["id_provenienza"] != "-1")
			{
				$where = $where. " AND ordini.id_provenienza = " . $_GET["id_provenienza"];
			}
			
  
						
  		$sql = 
  		"SELECT  SUM( ordini_dettaglio.qta) as qta_totale,  SUM(ordini_dettaglio.prezzo*ordini_dettaglio.qta) as importo_totale,  "
			. " ordini.id_cliente, ordini.id_provenienza ,  DATE_FORMAT(ordini.data_ricezione, '%d/%m/%Y') as data_ricezione_formatted,  "
  		. " clienti.descrizione as cliente_descrizione ,  provenienze.descrizione as desc_provenienza "
			. " FROM ordini_dettaglio "
			. " INNER JOIN ordini ON ordini_dettaglio.id_ordine = ordini.id_ordine "
			. " INNER JOIN clienti ON ordini.id_cliente = clienti.id_cliente "
			. " LEFT JOIN provenienze ON provenienze.id_provenienza = ordini.id_provenienza "

			. $where	
			. " GROUP BY ordini.id_cliente, ordini.id_provenienza , ordini.data_ricezione, clienti.descrizione, provenienze.descrizione"
			. " ORDER BY ordini.data_ricezione, clienti.descrizione   ";

  		
  		 
     // echo $sql; die();

			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
 
		 //echo $sql."<br>";
		 
?>
		<div style="page-break-inside: avoid;"><br/>
		<table class="tabella center" border="1" cellpadding = "4" cellspacing = "0" style="margin-top:1em;" >
				<tr  style="font-weight:bold; ">
					<td class="cell_data_richiesta" style="vertical-align: bottom;" >DATA RICHIESTA</td>
					<td   class="cell_cliente"  style="vertical-align: bottom;" >CLIENTE</td>
					<td  class="cell_provenienza"  style="vertical-align: bottom;" >PROVENIENZA</td>
			    <td  class="cell_qta" style="vertical-align: bottom;" >QTA</td>    
			    <td   class="cell_importo"  style="vertical-align: bottom;" >IMPORTO</td>
			    
			  </tr>	
			
<?php		 

			foreach ($result as $row)
			{ 			
 
		 		$importo_totale = $importo_totale + $row["importo_totale"];
			 
?>
				<tr>
					<td  class="cell_data_richiesta"  ><?php echo ($row["data_ricezione_formatted"]) ?></td>
					<td   class="cell_cliente"   ><?php echo ($row["cliente_descrizione"]) ?></td>
			    <td class="cell_provenienza"  ><?php echo ($row["desc_provenienza"] ) ?></td>    
					<td  class="cell_qta"  ><?php echo ($row["qta_totale"]) ?></td>
			    <td  class="cell_importo"  >€&nbsp;<?php echo (number_format($row["importo_totale"] , 2 , ",",".")) ?></td>
			  </tr>	
			
<?php			
			 
		}   

?>

				<tr>
					<td  colspan=4  >&nbsp;</td>

			    <td  class="cell_importo"  >€&nbsp;<?php echo (number_format($importo_totale , 2 , ",",".")) ?></td>
			  </tr>	
			  
 				 		 </table>
 				 		 <br>
		</div>
			  </body>
</html>
<?php
	 
} 
catch (Exception $e) 
{

 echo  ("errore ".$e->getMessage()  ); 	
  	
}	
	
?>

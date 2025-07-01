<?php
// https://www.cimicapp.com/temp/twine/api/ordini_stampa.php
error_reporting(0);
require_once "./JwtConfig.php";
require_once "./cors.php"; 
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
  margin: 12;
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
    
 
    .cell_articolo
    {
    	width: 8%
    }
    
 
        
    .cell_qta
    {
    	width: 5%;
    	text-align:left
    }
    
 
        xspan {
       white-space: nowrap;
     }
    
    </style>
  </head>

  <body onload=" window.print()  ">
  	 

<?php
//window.print()
 
  
 

$sql = "";



try
{
	include_once './db_config.php';		
			$json_elenco    = array();	
			
			$where = " WHERE  consegne_dettaglio.id_consegna_dettaglio  IS NULL  AND ordini_dettaglio.evaso = 0";
			// id_articolo_base=1&id_articolo_base=-1&id_provenienza=-1&data_consegna_al=&data_consegna_dal=&data_ricezione_al=&data_ricezione_dal=&evaso=No&consegnato=No
			if ($_GET["id_articolo_base"] != "-1")
			{
				$where = $where. " AND ordini_dettaglio.id_articolo_base = " . $_GET["id_articolo_base"];
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
		//		$where = $where. " AND 	clienti.descrizione like '" . $_GET["iniziali_cliente"] . "%' ";
			}
		
		
			if ($_GET["data_consegna_dal"] != "")
			{
				$where = $where. " AND 	DATE_FORMAT(ordini.data_consegna, '%Y-%m-%d')   >= '" . $_GET["data_consegna_dal"] . "' ";
			}
		
			if ($_GET["data_consegna_al"] != "")
			
			{ 
 
				$where = $where. " AND 	DATE_FORMAT(ordini.data_consegna, '%Y-%m-%d' ) <= '"  . $_GET["data_consegna_al"] . "' ";
			}
			
			
			
			if ($_GET["id_provenienza"] != "-1")
			{
				$where = $where. " AND ordini.id_provenienza = " . $_GET["id_provenienza"];
			}
			
			
			if ($_GET["id_articolo_base"] != "-1")
			{
				$where = $where. " AND ordini_dettaglio.id_articolo_base = " . $_GET["id_articolo_base"];
			}
						
			
 
 
			
			// TEST  $where =   " WHERE ordini_dettaglio.id_ordine_dettaglio = 11 ";
						
  		$sql = 
				" SELECT      "
				. " articoli_base.id_articolo_base, articoli_base.codice, articoli_base.descrizione ,   "
				. "  ordini_dettaglio.id_colore,   ordini_dettaglio.id_colore_2, ordini_dettaglio.id_colore_3,"
 				. " colori.codice as colore_codice, colori_2.codice as colore_codice_2, colori_3.codice as colore_codice_3 ,"
 				. " SUM(ordini_dettaglio.qta) as qta_totale "
 				. " FROM ordini_dettaglio "
 				. " INNER JOIN ordini ON ordini_dettaglio.id_ordine = ordini.id_ordine "
 //				. " INNER JOIN clienti ON ordini.id_cliente = ordini.id_cliente "
 				. " INNER JOIN articoli_base ON ordini_dettaglio.id_articolo_base = articoli_base.id_articolo_base "
 				. " INNER JOIN colori ON colori.id_colore = ordini_dettaglio.id_colore "
 				. " LEFT JOIN colori as colori_2 ON colori_2.id_colore = ordini_dettaglio.id_colore_2 "
 				. " LEFT JOIN colori as colori_3 ON colori_3.id_colore = ordini_dettaglio.id_colore_3 "
 				. " LEFT JOIN consegne_dettaglio ON consegne_dettaglio.id_ordine_dettaglio = ordini_dettaglio.id_ordine_dettaglio "
				. $where 
 				. " GROUP BY articoli_base.id_articolo_base, articoli_base.codice, articoli_base.descrizione ,"   
 				. " ordini_dettaglio.id_colore,   ordini_dettaglio.id_colore_2, ordini_dettaglio.id_colore_3,"
 				. " colori.codice  , colori_2.codice  , colori_3.codice  "
 				. " ORDER BY articoli_base.codice, articoli_base.descrizione, colori.codice , colori_2.codice, colori_3.codice	";
 				
			
		

     // echo $sql; die();

			$conn =$dbh = new PDO ('mysql:host='.HOST.';dbname='.DB, DB_USER, DB_PASSWORD); 
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
			$sth = $conn->prepare($sql);
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);		
			$prec_id_articolo_base = "-1";
		 	$MAX_COLONNE = 14;
		 	$countColonna = 0;
?>
				<div style="page-break-inside: avoid;"><br/>
				<table class="tabella center" border="1" cellpadding = "4" cellspacing = "0" style="margin-top:1em;" >
 

				<tr  style="font-weight:bold; ">
					<td class="cell_data_consegna" style="vertical-align: bottom;" >ARTICOLO</td>
					<td  colspan=14>&nbsp</td> 
			  

<?php		 

			foreach ($result as $row)
			{
				
				if ( $prec_id_articolo_base !=   $row["id_articolo_base"] )
				{
					$prec_id_articolo_base = $row["id_articolo_base"];
					if ($prec_id_articolo_base != -1)  
					{
						 echo ("</tr><tr>");
						 $countColonna = 0;
					}
					
				
				

				
				
?>
					<td class="cell_articolo"  ><b><?php echo  ($row["codice"]) ?></b></td> 
<?php
				}
			 	if ( $countColonna >= $MAX_COLONNE)
				{
					 echo ("</tr><tr><td>&nbsp;</td>");
					  $countColonna = 0;
				}
				$countColonna	++;
?>

				<td class="cell_qta" valign=top ><?php echo (
				"<b>". 	$row["qta_totale"] . "</b>&nbsp;".
				"<span>".	$row["colore_codice"] . "</span>"
					. ($row["colore_codice_2"] != "" ? "&nbsp;+&nbsp;" . "<span>".$row["colore_codice_2"]. "</span>" : "") 
					. ($row["colore_codice_3"] != "" ? "&nbsp;+&nbsp;" . "<span>".$row["colore_codice_3"]. "</span>" : "") 
					) ?></td> 
			       

			
<?php			
			 
		}   
		if ($prec_id_articolo_base != -1)  echo ("</tr>");;
?>
			</table>
		</div>
		
 <br>
			  </body>
</html>
<?php
	 
} 
catch (Exception $e) 
{

 echo  ("errore ".$e->getMessage()  ); 	
  	
}	
	
?>
